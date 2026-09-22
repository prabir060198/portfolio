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

    /* =========================================
   Chrome-style Dino Runner Animation
========================================= */

const dinoCanvas = document.getElementById("dinoCanvas");

if (dinoCanvas) {

    const ctx = dinoCanvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    let dinoX = -80;
    let speed = 2.5;

    let obstacles = [];
    let clouds = [];

    let lastTime = 0;
    let obstacleTimer = 0;
    let cloudTimer = 0;

    function resizeDinoCanvas() {

        const rect = dinoCanvas.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        dpr = Math.min(window.devicePixelRatio || 1, 2);

        dinoCanvas.width = width * dpr;
        dinoCanvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("resize", resizeDinoCanvas);

    resizeDinoCanvas();


    /* -----------------------------
       Draw Dinosaur
    ----------------------------- */

    function drawDino(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.fillStyle = "#ffffff";

        // Body
        ctx.fillRect(10, 15, 28, 22);

        // Head
        ctx.fillRect(30, 5, 18, 20);

        // Snout
        ctx.fillRect(45, 12, 10, 8);

        // Tail
        ctx.fillRect(3, 20, 10, 6);

        // Legs
        ctx.fillRect(15, 35, 6, 12);
        ctx.fillRect(30, 35, 6, 12);

        // Arms
        ctx.fillRect(37, 25, 12, 5);

        // Eye
        ctx.fillStyle = "#071018";
        ctx.fillRect(41, 9, 3, 3);

        ctx.restore();
    }


    /* -----------------------------
       Draw Cactus
    ----------------------------- */

    function drawCactus(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.fillStyle = "#00d9ff";

        // Main stem
        ctx.fillRect(8, 0, 8, 38);

        // Left arm
        ctx.fillRect(0, 15, 8, 6);
        ctx.fillRect(0, 10, 5, 11);

        // Right arm
        ctx.fillRect(16, 20, 8, 6);
        ctx.fillRect(19, 14, 5, 12);

        ctx.restore();
    }


    /* -----------------------------
       Draw Cloud
    ----------------------------- */

    function drawCloud(x, y, scale) {

        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 1.5;

        ctx.beginPath();

        ctx.moveTo(0, 15);
        ctx.lineTo(12, 15);

        ctx.arc(16, 12, 6, Math.PI, Math.PI * 2);

        ctx.arc(25, 10, 8, Math.PI, Math.PI * 2);

        ctx.arc(35, 13, 6, Math.PI, Math.PI * 2);

        ctx.lineTo(45, 15);

        ctx.stroke();

        ctx.restore();
    }


    /* -----------------------------
       Create obstacle
    ----------------------------- */

    function createObstacle() {

        obstacles.push({
            x: width + 30,
            y: height - 50,
            scale: 0.8 + Math.random() * 0.5
        });
    }


    /* -----------------------------
       Create cloud
    ----------------------------- */

    function createCloud() {

        clouds.push({
            x: width + 50,
            y: 15 + Math.random() * 30,
            scale: 0.7 + Math.random() * 0.5
        });
    }


    /* -----------------------------
       Animation
    ----------------------------- */

    function animate(time) {

        const delta = time - lastTime;
        lastTime = time;

        ctx.clearRect(0, 0, width, height);


        /* Ground */

        const groundY = height - 25;

        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(width, groundY);
        ctx.stroke();


        /* Clouds */

        cloudTimer += delta;

        if (cloudTimer > 2800) {

            createCloud();

            cloudTimer = 0;
        }

        clouds.forEach(cloud => {

            cloud.x -= speed * 0.35;

            drawCloud(
                cloud.x,
                cloud.y,
                cloud.scale
            );

        });

        clouds = clouds.filter(
            cloud => cloud.x > -100
        );


        /* Obstacles */

        obstacleTimer += delta;

        if (obstacleTimer > 1600 + Math.random() * 1800) {

            createObstacle();

            obstacleTimer = 0;
        }

        obstacles.forEach(obstacle => {

            obstacle.x -= speed;

            drawCactus(
                obstacle.x,
                groundY - 38,
                obstacle.scale
            );

        });

        obstacles = obstacles.filter(
            obstacle => obstacle.x > -100
        );


        /* Dinosaur */

        dinoX += speed * 0.8;

        const dinoScale =
            width < 600 ? 0.75 : 1;

        const dinoWidth = 55 * dinoScale;

        if (dinoX > width + 40) {

            dinoX = -dinoWidth;
        }

        const dinoY =
            groundY - (47 * dinoScale);

        drawDino(
            dinoX,
            dinoY,
            dinoScale
        );


        requestAnimationFrame(animate);
    }


    requestAnimationFrame(animate);
}

}