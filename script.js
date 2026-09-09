document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
       ELEMENT
    ========================================================= */

    const loadingScreen =
        document.getElementById("loadingScreen");

    const progress =
        document.getElementById("progress");

    const loadingPercent =
        document.getElementById("loadingPercent");

    const music =
        document.getElementById("music");

    const musicButton =
        document.getElementById("musicButton");

    const playMusic =
        document.getElementById("playMusic");


    /* =========================================================
       MUSIC
    ========================================================= */

    music.volume = 0.65;

    let musicStarted = false;


    function startMusic() {

        if (musicStarted) {
            return;
        }

        const playPromise =
            music.play();


        if (playPromise !== undefined) {

            playPromise

                .then(function () {

                    musicStarted = true;

                    musicButton.innerHTML = "♫";

                })

                .catch(function () {

                    console.log(
                        "Browser menunggu interaksi pengguna."
                    );

                });

        }

    }


    function toggleMusic() {

        if (music.paused) {

            music.play()

                .then(function () {

                    musicStarted = true;

                    musicButton.innerHTML = "♫";

                })

                .catch(function () {

                    console.log(
                        "Musik belum dapat dimainkan."
                    );

                });

        }

        else {

            music.pause();

            musicButton.innerHTML = "▶";

        }

    }


    /* =========================================================
       MUSIC BUTTON
    ========================================================= */

    if (musicButton) {

        musicButton.addEventListener(
            "click",
            toggleMusic
        );

    }


    if (playMusic) {

        playMusic.addEventListener(
            "click",
            toggleMusic
        );

    }


    /* =========================================================
       LOADING
    ========================================================= */

    let value = 0;

    const loading =
        setInterval(function () {

            value += 2;

            if (value >= 100) {

                value = 100;

            }


            progress.style.width =
                value + "%";


            loadingPercent.textContent =
                value + "%";


            if (value >= 100) {

                clearInterval(loading);


                setTimeout(function () {


                    /* -----------------------------------------
                       LOADING SELESAI
                    ----------------------------------------- */

                    loadingScreen.classList.add("hide");


                    /* -----------------------------------------
                       WEBSITE DIMULAI
                    ----------------------------------------- */

                    startWebsite();


                    /* -----------------------------------------
                       MUSIK SETELAH LOADING
                    ----------------------------------------- */

                    setTimeout(function () {

                        startMusic();

                    }, 1200);


                }, 700);

            }


        }, 35);


    /* =========================================================
       START WEBSITE
    ========================================================= */

    function startWebsite() {

        createParticles();

        createPetals();

        setupReveal();

    }


    /* =========================================================
       SCROLL REVEAL
    ========================================================= */

    function setupReveal() {

        const elements =
            document.querySelectorAll(".reveal");


        if (!("IntersectionObserver" in window)) {

            elements.forEach(function (element) {

                element.classList.add("active");

            });

            return;

        }


        const observer =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.10,

                    rootMargin:
                        "0px 0px -40px 0px"
                }

            );


        elements.forEach(function (element) {

            observer.observe(element);

        });

    }


    /* =========================================================
       PARTICLES
    ========================================================= */

    function createParticles() {

        const container =
            document.getElementById(
                "particles"
            );


        if (!container) {
            return;
        }


        /* -----------------------------------------
           Jumlah disesuaikan dengan perangkat
        ----------------------------------------- */

        const isMobile =
            window.innerWidth <= 520;


        const particleCount =
            isMobile ? 22 : 45;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {


            const particle =
                document.createElement(
                    "div"
                );


            particle.classList.add(
                "particle"
            );


            particle.style.left =
                Math.random() * 100 + "%";


            particle.style.animationDuration =
                (8 + Math.random() * 14) + "s";


            particle.style.animationDelay =
                Math.random() * 10 + "s";


            particle.style.opacity =
                0.2 + Math.random() * 0.7;


            container.appendChild(
                particle
            );

        }

    }


    /* =========================================================
       PETALS
    ========================================================= */

    function createPetals() {

        const container =
            document.getElementById(
                "petals"
            );


        if (!container) {
            return;
        }


        /* -----------------------------------------
           HP dibuat lebih ringan
        ----------------------------------------- */

        const isMobile =
            window.innerWidth <= 520;


        const petalCount =
            isMobile ? 9 : 18;


        for (
            let i = 0;
            i < petalCount;
            i++
        ) {


            const petal =
                document.createElement(
                    "div"
                );


            petal.classList.add(
                "petal"
            );


            petal.innerHTML =
                Math.random() > 0.5
                ? "❧"
                : "♥";


            petal.style.left =
                Math.random() * 100 + "%";


            petal.style.fontSize =
                (10 + Math.random() * 12) + "px";


            petal.style.animationDuration =
                (10 + Math.random() * 15) + "s";


            petal.style.animationDelay =
                Math.random() * 10 + "s";


            container.appendChild(
                petal
            );

        }

    }


    /* =========================================================
       AUTOPLAY FALLBACK
    ========================================================= */

    function tryMusicAfterInteraction() {

        if (
            loadingScreen.classList.contains("hide")
            &&
            music.paused
        ) {

            startMusic();

        }

    }


    /* =========================================================
       INTERACTION FALLBACK
       Jika browser HP memblokir autoplay,
       musik akan hidup saat user menyentuh website.
    ========================================================= */

    document.addEventListener(
        "click",
        tryMusicAfterInteraction,
        {
            once: true
        }
    );


    document.addEventListener(
        "touchstart",
        tryMusicAfterInteraction,
        {
            once: true,
            passive: true
        }
    );


    document.addEventListener(
        "keydown",
        tryMusicAfterInteraction,
        {
            once: true
        }
    );


});