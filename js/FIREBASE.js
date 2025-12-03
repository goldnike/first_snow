 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
        import { getDatabase, ref, push, onValue }
            from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

        // === ТУТ ЗАМІНИ СВІЙ URL ===
        const firebaseConfig = {
            databaseURL: "https://test-1-1387d-default-rtdb.firebaseio.com"
        };
        // ===========================

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);

        const listRef = ref(db, "comments_project2");

        // ==== ВИВЕДЕННЯ КОМЕНТАРІВ ЗАВЖДИ ====
        onValue(listRef, (snapshot) => {
            const commentsBox = document.getElementById("comments");
            commentsBox.innerHTML = ""; // очищаємо

            snapshot.forEach(child => {
                const data = child.val();

                const div = document.createElement("div");
                div.className = "comment-item";

                div.innerHTML = `
            <div><strong>${data.name}</strong> — ${data.datetime}</div>
            <div>${data.text}</div>
        `;

                commentsBox.appendChild(div);
            });
        });

        // ==== ВІДПРАВКА КОМЕНТАРЯ ====
        document.getElementById("commentForm").addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const text = document.getElementById("comment").value.trim();

            if (!name || !text) return;

            const now = new Date();
            const date = now.toLocaleDateString("uk-UA");
            const time = now.toLocaleTimeString("uk-UA", {
                hour: "2-digit", minute: "2-digit"
            });

            push(listRef, {
                name: name,
                text: text,
                datetime: `${date} ${time}`
            });

            document.getElementById("commentForm").reset();
        });