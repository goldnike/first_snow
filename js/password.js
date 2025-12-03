        const inputs = document.querySelectorAll(".pin");
        const correctPassword = "0312";

        inputs.forEach((input, index) => {
            input.addEventListener("input", () => {
                input.value = input.value.replace(/\D/g, ""); // тільки цифри

                if (input.value && index < inputs.length - 1) {
                    inputs[index + 1].focus(); // перейти далі
                }

                checkPin();
            });

            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && !input.value && index > 0) {
                    inputs[index - 1].focus(); // назад
                }
            });
        });

        function checkPin() {
            let code = "";
            inputs.forEach(i => code += i.value);

            if (code.length === 4) {
                if (code === correctPassword) {
                    document.getElementById("lockScreen").style.display = "none";
                    document.getElementById("siteContent").style.display = "block";
                    window.scrollTo(0, 0);
                } else {
                    document.getElementById("error").textContent = "Неправильний пароль";
                    inputs.forEach(i => i.value = "");
                    inputs[0].focus();
                }
            }
        }