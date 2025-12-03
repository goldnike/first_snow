        const track = document.querySelector(".carousel-track");
        const slides = document.querySelectorAll(".slide");
        const btnLeft = document.querySelector(".carousel-arrow.left");
        const btnRight = document.querySelector(".carousel-arrow.right");

        let index = 0;

        function update() {
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        btnRight.addEventListener("click", () => {
            if (index < slides.length - 1) index++;
            update();
        });

        btnLeft.addEventListener("click", () => {
            if (index > 0) index--;
            update();
        });

        update();