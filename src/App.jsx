import { useEffect, useRef } from 'react'; // useRef hinzugefügt
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodoStore } from './store/todoStore';

const App = () => {
  // Zustand und Aktionen aus dem Zustand-Store holen
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const setTodos = useTodoStore((state) => state.setTodos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleComplete = useTodoStore((state) => state.toggleComplete);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const setFilter = useTodoStore((state) => state.setFilter);

  // --- LocalStorage Effekte (Funktional korrekt) ---
  useEffect(() => {
    console.log('Versuche Todos aus LocalStorage zu laden...');
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        if (Array.isArray(parsedTodos)) {
          console.log('Gefundene Todos:', parsedTodos.length);
          setTodos(parsedTodos);
        } else {
          console.warn('LocalStorage enthielt ungültige Daten (kein Array), setze leeres Array.');
          setTodos([]);
        }
      } else {
        console.log('Keine Todos im LocalStorage gefunden, setze leeres Array.');
        setTodos([]);
      }
    } catch (error) {
      console.error("Fehler beim Parsen der Todos aus dem LocalStorage:", error);
      setTodos([]);
    }
  }, [setTodos]);

  useEffect(() => {
    if (todos) {
        console.log('Speichere Todos im LocalStorage:', todos.length);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // --- Berechtigungs-Effekt (Funktional korrekt) ---
  useEffect(() => {
    if (!("Notification" in window)) {
      console.error("Dieser Browser unterstützt keine Desktop-Benachrichtigungen.");
      return;
    }
    const currentPermission = Notification.permission;
    console.log("Aktueller Benachrichtigungsstatus beim Mount:", currentPermission);
    if (currentPermission === "default") {
      console.log("Benachrichtigungsberechtigung wird angefordert...");
      Notification.requestPermission().then((permission) => {
        console.log("Ergebnis der Berechtigungsanfrage:", permission);
        if (permission === "granted") {
          console.log("Benachrichtigungen wurden erlaubt.");
        } else if (permission === "denied") {
          console.warn("Benachrichtigungen wurden blockiert.");
        } else {
          console.log("Benutzer hat die Anfrage ignoriert (Permission bleibt 'default').");
        }
      });
    } else if (currentPermission === "denied") {
       console.warn("Benachrichtigungen sind bereits blockiert. Ggf. in Browser-/Seiteneinstellungen ändern.");
    } else {
       console.log("Benachrichtigungen sind bereits erlaubt (Permission: granted).");
    }
  }, []);

  // --- Korrigierter Reminder-Effekt mit useRef (Funktional korrekt) ---
  const todosRef = useRef(todos);
  useEffect(() => {
    todosRef.current = todos;
  }, [todos]);

  useEffect(() => {
    console.log("Reminder Effekt wird initialisiert (nur einmal beim Mount).");
    const checkReminders = () => {
      const currentTodos = todosRef.current;
      const now = new Date();
      console.log(`[${now.toLocaleTimeString()}] Interval Check: Überprüfe ${currentTodos.length} Todos...`);
      currentTodos.forEach(todo => {
        if (todo.dueDate && !todo.done) {
          const dueDate = new Date(todo.dueDate);
          if (!isNaN(dueDate) && dueDate <= now) {
            console.log(`--> Todo "${todo.title}" ist fällig (Fällig: ${dueDate.toLocaleString()}, Jetzt: ${now.toLocaleString()}).`);
            if ("Notification" in window && Notification.permission === "granted") {
              console.log(`   Sende Benachrichtigung für: "${todo.title}"`);
              try {
                new Notification(`Erinnerung: ${todo.title} ist fällig!`, {
                  body: `Fällig am: ${dueDate.toLocaleString()}`,
                  // tag: `todo-reminder-${todo.id || todo.title}`
                });
              } catch (error) {
                console.error(`Fehler beim Erstellen der Benachrichtigung für "${todo.title}":`, error);
              }
            } else {
              console.warn(`   Todo "${todo.title}" ist fällig, aber Benachrichtigungen nicht erlaubt/verfügbar. Status: ${Notification.permission}`);
            }
          } else if (isNaN(dueDate)) {
             console.warn(`   Todo "${todo.title}" hat ein ungültiges Fälligkeitsdatum: ${todo.dueDate}`);
          }
        }
      });
    };
    const intervalId = setInterval(checkReminders, 60000);
    console.log("Reminder Intervall gestartet (ID:", intervalId, "). Prüft jede Minute.");
    return () => {
      console.log("Komponente wird unmounted. Reminder Intervall wird gestoppt (ID:", intervalId, ")");
      clearInterval(intervalId);
    };
  }, []);

  // --- Filter-Funktion (Funktional korrekt) ---
  const filteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.done);
      case 'active':
        return todos.filter((todo) => !todo.done);
      default: // 'all'
        return todos;
    }
  };

  // --- JSX mit dem ursprünglichen Styling ---
  return (
    // Kein äußerer Container mehr, der zentriert, nur der Panel-Div selbst
    <div> {/* Optional: ein einfacher div als äußerstes Element */}
      {/* Das Panel mit dem ursprünglichen Gradienten und Styling */}
      <div className="bg-gradient-to-r from-[#100a0a] to-[#1af012] p-8 rounded-lg shadow-lg w-full sm:w-[600px]">
        {/* Header im ursprünglichen Stil */}
        <header className="bg-gray-900 p-4 shadow-md rounded-t-lg">
          <h3 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-[#100a0a] to-[#1af012] bg-clip-text">
            Todo App
          </h3>
        </header>

        {/* Main-Bereich im ursprünglichen Stil */}
        <main className="container mx-auto bg-gray-400 p-4 mt-6 rounded-lg shadow-md">
          {/* Todo Formular */}
          <TodoForm addTodo={addTodo} />

          {/* Filter Buttons im ursprünglichen Stil */}
          <div className="flex justify-center space-x-4 mb-4">
            <button
                onClick={() => setFilter('all')}
                // Hinweis: Hier könntest du noch Logik hinzufügen, um den aktiven Button hervorzuheben,
                // falls das im ursprünglichen Styling vorgesehen war (z.B. andere Klasse hinzufügen).
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Alle
            </button>
            <button
                onClick={() => setFilter('active')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Offene
            </button>
            <button
                onClick={() => setFilter('completed')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Erledigte
            </button>
          </div>

          {/* Todo Liste */}
          <TodoList
            // Wichtig: filteredTodos() aufrufen!
            todos={filteredTodos()}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        </main>

        {/* Footer im ursprünglichen Stil */}
        <footer className="bg-gray-800 p-4 text-center text-sm text-gray-300 shadow-md mt-6 rounded-b-lg">
          © Sebs Todo App
        </footer>
      </div>
    </div>
  );
};

export default App;