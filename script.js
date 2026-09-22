// =========================================================
// MOBILE MENU
// =========================================================

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


if (menuBtn && navMenu) {

    menuBtn.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle("active");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    // Close menu after clicking a link

    const navLinks =
        document.querySelectorAll(
            "#navMenu a"
        );


    navLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}



// =========================================================
// CURRENT YEAR
// =========================================================

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}



// =========================================================
// SCROLL REVEAL
// =========================================================

const sections =
    document.querySelectorAll(
        ".section"
    );


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    sections.forEach(
        (section) => {

            observer.observe(
                section
            );

        }
    );

}
else {

    sections.forEach(
        (section) => {

            section.classList.add(
                "visible"
            );

        }
    );

}



// =========================================================
// FUTURISTIC PARTICLE BACKGROUND
// =========================================================

const canvas =
    document.getElementById(
        "particleCanvas"
    );


if (canvas) {

    const ctx =
        canvas.getContext("2d");


    let particles = [];


    let animationFrame;


    const mouse = {

        x: null,

        y: null,

        radius: 140

    };



    // -----------------------------------------------------
    // DEVICE PIXEL RATIO
    // -----------------------------------------------------

    function resizeCanvas() {

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            window.innerWidth * dpr;


        canvas.height =
            window.innerHeight * dpr;


        canvas.style.width =
            `${window.innerWidth}px`;


        canvas.style.height =
            `${window.innerHeight}px`;


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        createParticles();

    }



    // -----------------------------------------------------
    // MOUSE
    // -----------------------------------------------------

    window.addEventListener(
        "mousemove",
        (event) => {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            mouse.x = null;

            mouse.y = null;

        }
    );



    // -----------------------------------------------------
    // PARTICLE CLASS
    // -----------------------------------------------------

    class Particle {

        constructor() {

            this.reset(true);

        }


        reset(randomPosition = false) {

            this.x =
                Math.random() *
                window.innerWidth;


            this.y =
                randomPosition
                    ? Math.random() *
                      window.innerHeight
                    : -10;


            this.size =
                Math.random() *
                1.5 +
                0.4;


            this.speedX =
                (Math.random() - 0.5)
                * 0.25;


            this.speedY =
                (Math.random() - 0.5)
                * 0.25;


            this.baseSize =
                this.size;


            this.opacity =
                Math.random() *
                0.5 +
                0.25;

        }


        update() {

            this.x +=
                this.speedX;


            this.y +=
                this.speedY;



            // Screen wrapping

            if (
                this.x < -20
            ) {

                this.x =
                    window.innerWidth + 20;

            }


            if (
                this.x >
                window.innerWidth + 20
            ) {

                this.x = -20;

            }


            if (
                this.y < -20
            ) {

                this.y =
                    window.innerHeight + 20;

            }


            if (
                this.y >
                window.innerHeight + 20
            ) {

                this.y = -20;

            }



            // Mouse interaction

            if (
                mouse.x !== null &&
                mouse.y !== null
            ) {

                const dx =
                    this.x -
                    mouse.x;


                const dy =
                    this.y -
                    mouse.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    mouse.radius
                ) {

                    const force =
                        (
                            mouse.radius -
                            distance
                        ) /
                        mouse.radius;


                    if (distance > 0) {

                        this.x +=
                            (
                                dx /
                                distance
                            ) *
                            force *
                            0.7;


                        this.y +=
                            (
                                dy /
                                distance
                            ) *
                            force *
                            0.7;

                    }


                    this.size =
                        this.baseSize +
                        force * 1.2;

                }
                else {

                    this.size =
                        this.baseSize;

                }

            }

        }


        draw() {

            ctx.beginPath();


            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    0,
                    229,
                    255,
                    ${this.opacity}
                )`;


            ctx.fill();

        }

    }



    // -----------------------------------------------------
    // CREATE PARTICLES
    // -----------------------------------------------------

    function createParticles() {

        particles = [];


        const isMobile =
            window.innerWidth < 700;


        const particleCount =
            isMobile
                ? 40
                : 90;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push(
                new Particle()
            );

        }

    }



    // -----------------------------------------------------
    // CONNECT PARTICLES
    // -----------------------------------------------------

    function connectParticles() {

        const maxDistance =
            window.innerWidth < 700
                ? 100
                : 125;


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const dx =
                    particles[i].x -
                    particles[j].x;


                const dy =
                    particles[i].y -
                    particles[j].y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    maxDistance
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            maxDistance
                        ) * 0.16;


                    ctx.beginPath();


                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );


                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );


                    ctx.strokeStyle =
                        `rgba(
                            0,
                            229,
                            255,
                            ${opacity}
                        )`;


                    ctx.lineWidth =
                        0.6;


                    ctx.stroke();

                }

            }

        }

    }



    // -----------------------------------------------------
    // MOUSE CONNECTIONS
    // -----------------------------------------------------

    function connectMouse() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {

            return;

        }


        const mouseDistance =
            180;


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            const dx =
                particles[i].x -
                mouse.x;


            const dy =
                particles[i].y -
                mouse.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                mouseDistance
            ) {

                const opacity =
                    (
                        1 -
                        distance /
                        mouseDistance
                    ) * 0.35;


                ctx.beginPath();


                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );


                ctx.lineTo(
                    mouse.x,
                    mouse.y
                );


                ctx.strokeStyle =
                    `rgba(
                        0,
                        229,
                        255,
                        ${opacity}
                    )`;


                ctx.lineWidth =
                    0.8;


                ctx.stroke();

            }

        }

    }



    // -----------------------------------------------------
    // ANIMATION
    // -----------------------------------------------------

    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );


        particles.forEach(
            (particle) => {

                particle.update();

                particle.draw();

            }
        );


        connectParticles();

        connectMouse();


        animationFrame =
            requestAnimationFrame(
                animateParticles
            );

    }



    // -----------------------------------------------------
    // START
    // -----------------------------------------------------

    resizeCanvas();

    animateParticles();



    // -----------------------------------------------------
    // RESIZE
    // -----------------------------------------------------

    let resizeTimeout;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimeout
            );


            resizeTimeout =
                setTimeout(
                    () => {

                        cancelAnimationFrame(
                            animationFrame
                        );


                        resizeCanvas();

                        animateParticles();

                    },
                    200
                );

        }
    );

}