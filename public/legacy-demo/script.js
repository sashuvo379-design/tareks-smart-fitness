/**
 * ============================================================================
 * TAREK'S SMART FITNESS ZONE & EXCLUSIVE LEATHER WALLET ZONE
 * 3D WebGL (Three.js) + Dynamic Single Page Application Engine
 * ============================================================================
 */

/* ============================================================================
   1. DATA CATALOGS (GYM SERVICES, 3D ZONES, WALLETS, WORKOUTS)
   ============================================================================ */
const GYM_ZONES = [
    {
        id: 'strength',
        title: 'স্ট্রেন্থ ও ফ্রি-ওয়েটস জোন',
        subtitle: 'Strength & Muscle Hypertrophy',
        icon: 'fa-dumbbell',
        desc: 'অত্যাধুনিক ইমপোর্টেড স্মিথ মেশিন, ক্যাবল ক্রসওভার, অলিম্পিক বারবেল এবং ২.৫ কেজি থেকে ৫০ কেজি পর্যন্ত প্রো ডাম্বল র‍্যাক।',
        img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        specs: ['ইমপোর্টেড বায়োমেকানিক্যাল মেশিন', 'অলিম্পিক বেঞ্চ ও স্কোয়াট র‍্যাক', 'হেভি ডিউটি রাবার ফ্লোরিং'],
        modelType: 'dumbbell'
    },
    {
        id: 'cardio',
        title: 'এডভান্সড কার্ডিও ও StairMaster',
        subtitle: 'Brahmanbaria’s First StairMaster Zone',
        icon: 'fa-running',
        desc: 'ব্রাহ্মণবাড়িয়ায় প্রথমবার অত্যাধুনিক স্টেয়ার ক্লাইম্বার (StairMaster), হেভি-ডিউটি কমার্শিয়াল ট্রেডমিল, ইলিপটিক্যাল ক্রস ট্রেইনার এবং স্পিন বাইক।',
        img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
        specs: ['এক্সক্লুসিভ StairMaster মেশিন', 'হার্ট-রেট সেন্সর ট্রেডমিল', 'হাই-ইমপ্যাক্ট ফ্যাট বার্নিং জোন'],
        modelType: 'stairmaster'
    },
    {
        id: 'trainer',
        title: 'সার্টিফাইড প্রো-ট্রেইনার গাইডেন্স',
        subtitle: '1-on-1 Personal & General Coaching',
        icon: 'fa-user-ninja',
        desc: 'প্রতিটি মেম্বারের বডি টাইপ, ইনজুরি হিস্ট্রি এবং ফিটনেস গোল অনুযায়ী কাস্টমাইজড ওয়ার্কআউট প্ল্যান ও সঠিক ফর্ম কারেকশন।',
        img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
        specs: ['বডি কম্পোজিশন অ্যাসেসমেন্ট', 'ইনজুরি-ফ্রি বায়োমেকানিক্স', 'সাপ্তাহিক প্রগ্রেস ট্র্যাকিং'],
        modelType: 'kettlebell'
    },
    {
        id: 'nutrition',
        title: 'সাইন্টিফিক ডায়েট ও নিউট্রিশন ল্যাব',
        subtitle: 'Custom Macro & Supplement Guide',
        icon: 'fa-apple-alt',
        desc: 'মাসল গেইন কিংবা ফ্যাট লস—আপনার লক্ষ্যের সাথে মিল রেখে দেশীয় সহজলভ্য খাবারের মাধ্যমে প্র্যাকটিক্যাল ডায়েট চার্ট।',
        img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
        specs: ['ক্যালরি ও ম্যাক্রো চার্ট', 'ফ্যাট লস ও মাসল গেইন প্ল্যান', 'হাইড্রেশন ও রিকভারি গাইড'],
        modelType: 'core'
    }
];

const GYM_SERVICES = [
    { id: 1, title: 'স্ট্রেন্থ ট্রেনিং জোন', desc: 'মডার্ন ওয়েট লিফটিং মেশিন এবং বিশাল ফ্রি ওয়েটস জোন আপনার মাসল বিল্ড করতে সাহায্য করবে।', icon: 'fa-dumbbell', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'এডভান্সড কার্ডিও ও StairMaster', desc: 'প্রফেশনাল ট্রেডমিল, ক্রস ট্রেইনার, এবং ব্রাহ্মণবাড়িয়ায় প্রথমবার এক্সক্লুসিভ স্টেয়ার ক্লাইম্বার (StairMaster)।', icon: 'fa-running', img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'প্রো-ট্রেইনার গাইডেন্স', desc: 'সার্টিফাইড ট্রেইনারের স্পেশাল তত্ত্বাবধানে কাস্টমাইজড ওয়ার্কআউট প্ল্যান ও ফর্ম কারেকশন।', icon: 'fa-user-ninja', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'ডায়েট ও নিউট্রিশন প্ল্যান', desc: 'বডি টাইপ ও গোল অনুযায়ী সাইন্টিফিক ডায়েট চার্ট এবং ম্যাক্রো নিউট্রিশন পরামর্শ।', icon: 'fa-apple-alt', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80' },
    { id: 5, title: 'পার্সোনাল লকার ও চেঞ্জিং রুম', desc: 'নিরাপদ ডিজিটাল/পার্সোনাল লকার সুবিধা এবং পরিচ্ছন্ন ও স্বাস্থ্যসম্মত পরিবেশ।', icon: 'fa-shield-alt', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80' },
    { id: 6, title: 'ওয়েট লস ও ট্রান্সফরমেশন ক্যাম্প', desc: '৯০ দিনের টার্গেটেড ফ্যাট লস ও বডি রিকম্পোজিশন চ্যালেঞ্জ প্রোগ্রাম।', icon: 'fa-fire-alt', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80' }
];

const WALLET_INVENTORY = [
    { id: 'W101', name: 'Premium Black Bifold Wallet', price: 1250, oldPrice: 1500, category: 'bifold', colorHex: 0x18181c, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80', badge: 'Best Seller', stock: true },
    { id: 'W102', name: 'Vintage Brown Leather Wallet', price: 1400, oldPrice: 1800, category: 'bifold', colorHex: 0x5c3317, img: 'https://images.unsplash.com/photo-1559564484-e48b3e040ff4?auto=format&fit=crop&w=600&q=80', badge: 'Premium', stock: true },
    { id: 'W103', name: 'Executive Slim Cardholder', price: 950, oldPrice: 1200, category: 'cardholder', colorHex: 0x2b1d14, img: 'https://images.unsplash.com/photo-1606509036967-8bd68c92a9b6?auto=format&fit=crop&w=600&q=80', badge: 'Slim 3D', stock: true },
    { id: 'W104', name: 'Royal Long Zip Wallet', price: 1850, oldPrice: 2200, category: 'long', colorHex: 0x3d2210, img: 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?auto=format&fit=crop&w=600&q=80', badge: 'New Arrival', stock: true },
    { id: 'W105', name: 'Minimalist Tan Leather Wallet', price: 1150, oldPrice: 1300, category: 'bifold', colorHex: 0x9c6228, img: 'https://images.unsplash.com/photo-1549495147-9759bc65a12f?auto=format&fit=crop&w=600&q=80', badge: 'Handcrafted', stock: true },
    { id: 'W106', name: 'Carbon Fiber Texture Bifold', price: 1300, oldPrice: null, category: 'bifold', colorHex: 0x22252a, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80&sat=-100', badge: 'Sport', stock: true },
    { id: 'W107', name: 'Traveler Passport Long Wallet', price: 2100, oldPrice: 2500, category: 'long', colorHex: 0x4a2511, img: 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?auto=format&fit=crop&w=600&q=80&hue=30', badge: 'Elite', stock: false },
    { id: 'W108', name: 'Pop-up Smart RFID Card Holder', price: 1100, oldPrice: 1400, category: 'cardholder', colorHex: 0x151518, img: 'https://images.unsplash.com/photo-1606509036967-8bd68c92a9b6?auto=format&fit=crop&w=600&q=80&bri=-10', badge: 'Smart RFID', stock: true }
];

const WORKOUT_ROUTINES = [
    { id: 'w1', name: 'Warm-up & Dynamic Mobility', sets: '2', reps: '5 Mins', done: true },
    { id: 'w2', name: 'Incline Dumbbell Press (3D Form)', sets: '4', reps: '10-12', done: false },
    { id: 'w3', name: 'Flat Barbell Bench Press', sets: '4', reps: '8-10', done: false },
    { id: 'w4', name: 'Cable Chest Flyes (Hypertrophy)', sets: '3', reps: '15', done: false },
    { id: 'w5', name: 'Rope Tricep Pushdown', sets: '3', reps: '12-15', done: false },
    { id: 'w6', name: 'StairMaster HIIT Finisher', sets: '1', reps: '15 Mins', done: false }
];

/* ============================================================================
   2. 3D WEBGL HERO EQUIPMENT ENGINE (THREE.JS)
   ============================================================================ */
const hero3D = {
    scene: null,
    camera: null,
    renderer: null,
    rootGroup: null,
    currentModelGroup: null,
    particles: null,
    currentType: 'dumbbell',
    isExploded: false,
    isDragging: false,
    prevMouse: { x: 0, y: 0 },
    targetRot: { x: 0.25, y: 0.6 },
    clock: null,

    init: function () {
        const canvas = document.getElementById('hero-3d-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();

        const width = canvas.clientWidth || 550;
        const height = canvas.clientHeight || 500;

        this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
        this.camera.position.set(0, 0.4, 7.2);

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this.renderer.setSize(width, height, false);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
        this.scene.add(ambientLight);

        const redLight = new THREE.PointLight(0xff1e1e, 3.2, 18);
        redLight.position.set(4, 3, 4);
        this.scene.add(redLight);

        const goldLight = new THREE.PointLight(0xd4af37, 2.2, 18);
        goldLight.position.set(-4, -2, 3);
        this.scene.add(goldLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
        rimLight.position.set(0, 5, -5);
        this.scene.add(rimLight);

        this.rootGroup = new THREE.Group();
        this.scene.add(this.rootGroup);

        // Ambient 3D floating energy rings around the stage
        this.createStageRings();

        // Build initial 3D model
        this.loadModel('dumbbell');

        // Pointer interaction
        this.bindInteraction(canvas);

        // Resize observer
        window.addEventListener('resize', () => this.onResize());

        // Start animation loop
        this.animate();
    },

    createStageRings: function () {
        const ringGeo = new THREE.TorusGeometry(2.7, 0.015, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xff1e1e, transparent: true, opacity: 0.3 });
        const ring1 = new THREE.Mesh(ringGeo, ringMat);
        ring1.rotation.x = Math.PI / 2.2;
        this.scene.add(ring1);

        // Floating sparks inside 3D stage
        const count = 90;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            pos[i] = (Math.random() - 0.5) * 7;
        }
        const partGeo = new THREE.BufferGeometry();
        partGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const partMat = new THREE.PointsMaterial({ color: 0xff3b3b, size: 0.06, transparent: true, opacity: 0.75 });
        this.particles = new THREE.Points(partGeo, partMat);
        this.scene.add(this.particles);
    },

    loadModel: function (type) {
        this.currentType = type;
        this.isExploded = false;

        if (this.currentModelGroup) {
            this.rootGroup.remove(this.currentModelGroup);
        }

        const group = new THREE.Group();

        const darkIronMat = new THREE.MeshStandardMaterial({
            color: 0x1a1a22,
            metalness: 0.85,
            roughness: 0.28
        });
        const chromeMat = new THREE.MeshStandardMaterial({
            color: 0xd8dce6,
            metalness: 0.95,
            roughness: 0.12
        });
        const neonRedMat = new THREE.MeshStandardMaterial({
            color: 0xff1e1e,
            emissive: 0xff0000,
            emissiveIntensity: 0.45,
            metalness: 0.5,
            roughness: 0.2
        });
        const goldMat = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.9,
            roughness: 0.2
        });

        if (type === 'dumbbell') {
            // Central Chrome Handle
            const handleGeo = new THREE.CylinderGeometry(0.16, 0.16, 2.8, 32);
            handleGeo.rotateZ(Math.PI / 2);
            const handle = new THREE.Mesh(handleGeo, chromeMat);
            group.add(handle);

            // Knurling grip rings
            for (let side of [-0.45, 0.45]) {
                const gripGeo = new THREE.CylinderGeometry(0.175, 0.175, 0.65, 24);
                gripGeo.rotateZ(Math.PI / 2);
                const grip = new THREE.Mesh(gripGeo, darkIronMat);
                grip.position.x = side;
                group.add(grip);
            }

            // Hex / Octagonal Pro Weight Plates on Left & Right
            const plateConfigs = [
                { offset: 1.05, radius: 1.15, thick: 0.28, explodeShift: 0.35 },
                { offset: 1.38, radius: 0.95, thick: 0.25, explodeShift: 0.7 },
                { offset: 1.66, radius: 0.75, thick: 0.22, explodeShift: 1.05 }
            ];

            plateConfigs.forEach(cfg => {
                [-1, 1].forEach(dir => {
                    const plateGroup = new THREE.Group();
                    const plateGeo = new THREE.CylinderGeometry(cfg.radius, cfg.radius, cfg.thick, 8);
                    plateGeo.rotateZ(Math.PI / 2);
                    const plate = new THREE.Mesh(plateGeo, darkIronMat);
                    plateGroup.add(plate);

                    // Glowing Red Rim Accent
                    const rimGeo = new THREE.TorusGeometry(cfg.radius * 0.82, 0.03, 12, 32);
                    rimGeo.rotateY(Math.PI / 2);
                    const rim = new THREE.Mesh(rimGeo, neonRedMat);
                    plateGroup.add(rim);

                    plateGroup.position.x = dir * cfg.offset;
                    plateGroup.userData = {
                        baseX: dir * cfg.offset,
                        explodedX: dir * (cfg.offset + cfg.explodeShift)
                    };
                    group.add(plateGroup);
                });
            });

            // End Caps
            [-1.85, 1.85].forEach(xPos => {
                const capGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 24);
                capGeo.rotateZ(Math.PI / 2);
                const cap = new THREE.Mesh(capGeo, goldMat);
                cap.position.x = xPos;
                cap.userData = { baseX: xPos, explodedX: xPos * 1.65 };
                group.add(cap);
            });
        } else if (type === 'stairmaster') {
            // Base Frame
            const baseGeo = new THREE.BoxGeometry(2.2, 0.2, 2.6);
            const base = new THREE.Mesh(baseGeo, darkIronMat);
            base.position.y = -1.3;
            group.add(base);

            // Moving Stair Steps
            for (let i = 0; i < 4; i++) {
                const stepGroup = new THREE.Group();
                const stepGeo = new THREE.BoxGeometry(1.4, 0.18, 0.55);
                const step = new THREE.Mesh(stepGeo, darkIronMat);
                const stripGeo = new THREE.BoxGeometry(1.35, 0.04, 0.06);
                const strip = new THREE.Mesh(stripGeo, neonRedMat);
                strip.position.set(0, 0.1, 0.25);
                stepGroup.add(step);
                stepGroup.add(strip);
                stepGroup.position.set(0, -0.9 + i * 0.45, 0.6 - i * 0.45);
                stepGroup.userData = {
                    baseY: -0.9 + i * 0.45,
                    explodedX: (i % 2 === 0 ? 1 : -1) * 0.6
                };
                group.add(stepGroup);
            }

            // Side Rails
            [-0.9, 0.9].forEach(xSide => {
                const railGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.6, 16);
                const rail = new THREE.Mesh(railGeo, chromeMat);
                rail.position.set(xSide, 0.1, -0.2);
                rail.rotation.x = -0.55;
                rail.userData = { baseX: xSide, explodedX: xSide * 1.5 };
                group.add(rail);
            });

            // Console Screen
            const consoleGeo = new THREE.BoxGeometry(1.3, 0.85, 0.15);
            const consoleMesh = new THREE.Mesh(consoleGeo, darkIronMat);
            consoleMesh.position.set(0, 1.25, -0.85);
            consoleMesh.rotation.x = -0.35;

            const screenGeo = new THREE.PlaneGeometry(1.1, 0.65);
            const screenMesh = new THREE.Mesh(screenGeo, neonRedMat);
            screenMesh.position.z = 0.09;
            consoleMesh.add(screenMesh);
            group.add(consoleMesh);
        } else if (type === 'kettlebell') {
            // Spherical Body
            const bodyGeo = new THREE.SphereGeometry(1.15, 36, 36);
            const body = new THREE.Mesh(bodyGeo, darkIronMat);
            body.position.y = -0.35;
            group.add(body);

            // Flat Bottom Base
            const baseGeo = new THREE.CylinderGeometry(0.75, 0.8, 0.2, 32);
            const base = new THREE.Mesh(baseGeo, goldMat);
            base.position.y = -1.38;
            group.add(base);

            // Glowing Equatorial Belt
            const beltGeo = new THREE.TorusGeometry(1.16, 0.04, 16, 64);
            beltGeo.rotateX(Math.PI / 2);
            const belt = new THREE.Mesh(beltGeo, neonRedMat);
            belt.position.y = -0.35;
            belt.userData = { baseX: 0, explodedX: 0 };
            group.add(belt);

            // Curved U-Handle
            const handleGeo = new THREE.TorusGeometry(0.85, 0.16, 24, 48, Math.PI);
            const handle = new THREE.Mesh(handleGeo, chromeMat);
            handle.position.y = 0.55;
            group.add(handle);
        } else if (type === 'core') {
            // Cyber Fitness Core
            const icoGeo = new THREE.IcosahedronGeometry(0.85, 0);
            const ico = new THREE.Mesh(icoGeo, neonRedMat);
            group.add(ico);

            const wireGeo = new THREE.IcosahedronGeometry(1.08, 1);
            const wireMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, wireframe: true, transparent: true, opacity: 0.6 });
            const wire = new THREE.Mesh(wireGeo, wireMat);
            group.add(wire);

            [1.45, 1.85, 2.2].forEach((rad, idx) => {
                const gyroGeo = new THREE.TorusGeometry(rad, 0.04, 16, 80);
                const gyro = new THREE.Mesh(gyroGeo, idx % 2 === 0 ? chromeMat : goldMat);
                gyro.rotation.set(idx * 0.8, idx * 0.5, 0);
                gyro.userData = { gyroSpeed: (idx + 1) * 0.4 };
                group.add(gyro);
            });
        }

        this.currentModelGroup = group;
        this.rootGroup.add(group);

        // Update active button state
        document.querySelectorAll('.model-switch-btn[data-model]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-model') === type);
        });
    },

    toggleExplode: function () {
        this.isExploded = !this.isExploded;
        const btn = document.getElementById('explode-toggle-btn');
        if (btn) btn.classList.toggle('active', this.isExploded);
    },

    bindInteraction: function (canvas) {
        const startDrag = (x, y) => {
            this.isDragging = true;
            this.prevMouse = { x, y };
        };
        const moveDrag = (x, y) => {
            if (!this.isDragging) return;
            const dx = x - this.prevMouse.x;
            const dy = y - this.prevMouse.y;
            this.targetRot.y += dx * 0.01;
            this.targetRot.x = Math.max(-1.2, Math.min(1.2, this.targetRot.x + dy * 0.01));
            this.prevMouse = { x, y };
        };
        const endDrag = () => { this.isDragging = false; };

        canvas.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
        window.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
        window.addEventListener('mouseup', endDrag);

        canvas.addEventListener('touchstart', e => {
            if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
        canvas.addEventListener('touchmove', e => {
            if (e.touches.length === 1) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
        canvas.addEventListener('touchend', endDrag);
    },

    onResize: function () {
        const canvas = document.getElementById('hero-3d-canvas');
        if (!canvas || !this.renderer) return;
        const width = canvas.clientWidth || 500;
        const height = canvas.clientHeight || 450;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height, false);
    },

    animate: function () {
        requestAnimationFrame(() => this.animate());
        if (!this.renderer || !this.scene || !this.camera) return;

        const elapsed = this.clock.getElapsedTime();

        if (!this.isDragging) {
            this.targetRot.y += 0.006;
        }

        if (this.rootGroup) {
            this.rootGroup.rotation.y += (this.targetRot.y - this.rootGroup.rotation.y) * 0.08;
            this.rootGroup.rotation.x += (this.targetRot.x - this.rootGroup.rotation.x) * 0.08;
            this.rootGroup.position.y = Math.sin(elapsed * 2) * 0.12;
        }

        // Handle Explode & Gyro animations
        if (this.currentModelGroup) {
            this.currentModelGroup.children.forEach(child => {
                if (child.userData && typeof child.userData.baseX === 'number') {
                    const destX = this.isExploded ? child.userData.explodedX : child.userData.baseX;
                    child.position.x += (destX - child.position.x) * 0.1;
                }
                if (child.userData && child.userData.gyroSpeed) {
                    child.rotation.x += 0.01 * child.userData.gyroSpeed;
                    child.rotation.y += 0.015 * child.userData.gyroSpeed;
                }
            });
        }

        if (this.particles) {
            this.particles.rotation.y = elapsed * 0.08;
        }

        this.renderer.render(this.scene, this.camera);
    }
};

/* ============================================================================
   3. 3D INTERACTIVE LEATHER WALLET ENGINE (THREE.JS)
   ============================================================================ */
const wallet3D = {
    scene: null,
    camera: null,
    renderer: null,
    walletGroup: null,
    rightFlapGroup: null,
    leatherMat: null,
    isOpen: false,
    targetOpenAngle: -0.4,
    rotY: -0.35,

    init: function () {
        const canvas = document.getElementById('wallet-3d-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        this.scene = new THREE.Scene();
        const width = canvas.clientWidth || 400;
        const height = canvas.clientHeight || 280;

        this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
        this.camera.position.set(0, 0.8, 5.2);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this.renderer.setSize(width, height, false);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const amb = new THREE.AmbientLight(0xffffff, 0.75);
        this.scene.add(amb);

        const keyLight = new THREE.PointLight(0xf9e8a2, 2.5, 15);
        keyLight.position.set(3, 4, 4);
        this.scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0xd4af37, 1.5);
        rimLight.position.set(-3, 2, -3);
        this.scene.add(rimLight);

        this.walletGroup = new THREE.Group();
        this.scene.add(this.walletGroup);

        this.leatherMat = new THREE.MeshStandardMaterial({
            color: 0x18181c,
            roughness: 0.42,
            metalness: 0.15
        });
        const goldStitchMat = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.85,
            roughness: 0.2
        });
        const cardMat = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.9,
            roughness: 0.15
        });

        // Left Wing of Bifold Wallet
        const leftWing = new THREE.Group();
        const wingGeo = new THREE.BoxGeometry(1.65, 2.1, 0.12);
        const leftMesh = new THREE.Mesh(wingGeo, this.leatherMat);
        leftMesh.position.x = -0.82;
        leftWing.add(leftMesh);

        // Gold Logo Crest on Left Wing
        const badgeGeo = new THREE.BoxGeometry(0.45, 0.18, 0.14);
        const badgeMesh = new THREE.Mesh(badgeGeo, goldStitchMat);
        badgeMesh.position.set(-1.1, -0.65, 0.01);
        leftWing.add(badgeMesh);

        this.walletGroup.add(leftWing);

        // Right Hinged Flap of Bifold Wallet
        this.rightFlapGroup = new THREE.Group();
        const rightMesh = new THREE.Mesh(wingGeo, this.leatherMat);
        rightMesh.position.x = 0.82;
        this.rightFlapGroup.add(rightMesh);

        // Inside VIP Gold Credit Card peeking out
        const creditCardGeo = new THREE.BoxGeometry(1.35, 0.85, 0.03);
        const creditCard = new THREE.Mesh(creditCardGeo, cardMat);
        creditCard.position.set(0.82, 0.35, -0.08);
        this.rightFlapGroup.add(creditCard);

        this.walletGroup.add(this.rightFlapGroup);

        // Mouse / touch drag for wallet
        let dragging = false, prevX = 0;
        canvas.addEventListener('mousedown', e => { dragging = true; prevX = e.clientX; });
        window.addEventListener('mousemove', e => {
            if (!dragging) return;
            this.rotY += (e.clientX - prevX) * 0.012;
            prevX = e.clientX;
        });
        window.addEventListener('mouseup', () => { dragging = false; });

        window.addEventListener('resize', () => this.onResize());
        this.animate();
    },

    setColor: function (hexColor, btnEl) {
        if (this.leatherMat) {
            this.leatherMat.color.setHex(hexColor);
        }
        if (btnEl) {
            document.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('active'));
            btnEl.classList.add('active');
        }
    },

    toggleFold: function () {
        this.isOpen = !this.isOpen;
        this.targetOpenAngle = this.isOpen ? -0.25 : -2.65;
    },

    onResize: function () {
        const canvas = document.getElementById('wallet-3d-canvas');
        if (!canvas || !this.renderer) return;
        const w = canvas.clientWidth || 400;
        const h = canvas.clientHeight || 280;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h, false);
    },

    animate: function () {
        requestAnimationFrame(() => this.animate());
        if (!this.renderer || !this.scene || !this.camera) return;

        this.rotY += 0.004;
        if (this.walletGroup) {
            this.walletGroup.rotation.y = this.rotY;
            this.walletGroup.rotation.x = Math.sin(this.rotY * 0.5) * 0.12;
        }
        if (this.rightFlapGroup) {
            this.rightFlapGroup.rotation.y += (this.targetOpenAngle - this.rightFlapGroup.rotation.y) * 0.08;
        }

        this.renderer.render(this.scene, this.camera);
    }
};

/* ============================================================================
   4. 3D BIOMETRIC BMI VISUALIZER (THREE.JS)
   ============================================================================ */
const bmi3D = {
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    ring: null,
    targetScaleX: 1,

    init: function () {
        const canvas = document.getElementById('bmi-3d-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
        this.camera.position.set(0, 0, 4.2);

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this.renderer.setSize(180, 180, false);

        const light = new THREE.PointLight(0xffffff, 2, 10);
        light.position.set(2, 3, 4);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));

        const geo = new THREE.OctahedronGeometry(1.1, 2);
        const mat = new THREE.MeshStandardMaterial({
            color: 0xff1e1e,
            wireframe: true,
            emissive: 0xff1e1e,
            emissiveIntensity: 0.35
        });
        this.mesh = new THREE.Mesh(geo, mat);
        this.scene.add(this.mesh);

        const ringGeo = new THREE.TorusGeometry(1.45, 0.03, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e676 });
        this.ring = new THREE.Mesh(ringGeo, ringMat);
        this.ring.rotation.x = Math.PI / 2.4;
        this.scene.add(this.ring);

        this.animate();
    },

    updateBiometrics: function (hexColor, scaleWidth) {
        if (!this.mesh || !this.ring) return;
        this.mesh.material.color.setHex(hexColor);
        this.mesh.material.emissive.setHex(hexColor);
        this.ring.material.color.setHex(hexColor);
        this.targetScaleX = scaleWidth;
    },

    animate: function () {
        requestAnimationFrame(() => this.animate());
        if (!this.renderer || !this.mesh) return;
        this.mesh.rotation.y += 0.015;
        this.mesh.rotation.x += 0.006;
        this.mesh.scale.x += (this.targetScaleX - this.mesh.scale.x) * 0.08;
        this.mesh.scale.z += (this.targetScaleX - this.mesh.scale.z) * 0.08;
        this.ring.rotation.z -= 0.02;
        this.renderer.render(this.scene, this.camera);
    }
};

/* ============================================================================
   5. AMBIENT BACKGROUND PARTICLES & 3D CARD TILT SYSTEM
   ============================================================================ */
const bgParticles = {
    init: function () {
        const canvas = document.getElementById('bg-particles-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const dots = Array.from({ length: 45 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 0.6,
            vx: (Math.random() - 0.5) * 0.35,
            vy: -Math.random() * 0.45 - 0.1,
            color: Math.random() > 0.3 ? 'rgba(255, 30, 30, 0.45)' : 'rgba(212, 175, 55, 0.4)'
        }));

        window.addEventListener('resize', () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            dots.forEach(d => {
                d.x += d.vx;
                d.y += d.vy;
                if (d.y < 0) d.y = h;
                if (d.x < 0) d.x = w;
                if (d.x > w) d.x = 0;

                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = d.color;
                ctx.fill();
            });
            requestAnimationFrame(draw);
        };
        draw();
    }
};

const tiltEngine = {
    bindAll: function () {
        document.querySelectorAll('.tilt-card').forEach(card => {
            if (card.dataset.tiltBound) return;
            card.dataset.tiltBound = 'true';

            if (!card.querySelector('.card-glare')) {
                const glare = document.createElement('div');
                glare.className = 'card-glare';
                card.appendChild(glare);
            }

            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -7;
                const rotateY = ((x - centerX) / centerX) * 7;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }
};

/* ============================================================================
   6. CORE APPLICATION CONTROLLER (SPA ROUTING, ZONES, BMI, PORTAL)
   ============================================================================ */
const app = {
    views: ['home', 'services', 'wallets', 'pricing', 'portal'],
    activeMembership: null,

    init: function () {
        this.bindEvents();
        this.updateLiveGymStatus();
        this.renderZoneExplorer(0);
        this.renderServices();
        this.renderWallets('all');
        this.renderWorkoutRoutine();
        this.handleScroll();

        // Initialize 3D Engines
        bgParticles.init();
        hero3D.init();
        bmi3D.init();
        wallet3D.init();
        tiltEngine.bindAll();
    },

    bindEvents: function () {
        document.querySelectorAll('[data-target]').forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
                const target = e.currentTarget.getAttribute('data-target');
                if (target) this.navigate(target);
            });
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.renderWallets(e.currentTarget.getAttribute('data-filter'));
            });
        });

        window.addEventListener('scroll', () => this.handleScroll());
    },

    updateLiveGymStatus: function () {
        const badgeEl = document.getElementById('live-gym-status-text');
        if (!badgeEl) return;
        const hour = new Date().getHours();
        const isOpen = hour >= 7 && hour < 23;
        badgeEl.innerHTML = isOpen
            ? 'জিম এখন খোলা (07:00 AM - 11:00 PM)'
            : 'জিম এখন বন্ধ • খুলবে সকাল ৭:০০ টায়';
    },

    handleScroll: function () {
        const nav = document.getElementById('navbar');
        if (!nav) return;
        if (window.scrollY > 40) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    },

    navigate: function (viewId) {
        if (!this.views.includes(viewId)) return;

        this.views.forEach(v => {
            const el = document.getElementById(`view-${v}`);
            if (el) el.classList.remove('active-view');
        });

        const targetView = document.getElementById(`view-${viewId}`);
        if (targetView) targetView.classList.add('active-view');

        window.scrollTo({ top: 0, behavior: 'smooth' });

        document.querySelectorAll('.nav-link, .bottom-nav-item').forEach(el => {
            el.classList.toggle('active', el.getAttribute('data-target') === viewId);
        });

        // Trigger resize on 3D canvases when their tab becomes visible
        setTimeout(() => {
            if (viewId === 'home') hero3D.onResize();
            if (viewId === 'wallets') wallet3D.onResize();
            tiltEngine.bindAll();
        }, 60);
    },

    renderZoneExplorer: function (activeIndex) {
        const tabsContainer = document.getElementById('zone-tabs-container');
        const stageContainer = document.getElementById('zone-stage-container');
        if (!tabsContainer || !stageContainer) return;

        tabsContainer.innerHTML = GYM_ZONES.map((z, idx) => `
            <button class="zone-tab-btn ${idx === activeIndex ? 'active' : ''}" onclick="app.selectZone(${idx})">
                <i class="fas ${z.icon}"></i>
                <div>
                    <h4>${z.title}</h4>
                    <p>${z.subtitle}</p>
                </div>
            </button>
        `).join('');

        const active = GYM_ZONES[activeIndex];
        stageContainer.innerHTML = `
            <img src="${active.img}" alt="${active.title}" class="zone-stage-img">
            <div class="zone-stage-overlay">
                <span class="badge badge-primary mb-2"><i class="fas fa-cube"></i> 3D Interactive Zone</span>
                <h3 style="font-size: 1.9rem; color: #fff; margin-bottom: 8px;">${active.title}</h3>
                <p style="color: #ddd; max-width: 620px; margin-bottom: 12px;">${active.desc}</p>
                <div class="zone-specs-pills">
                    ${active.specs.map(s => `<span class="spec-pill"><i class="fas fa-check-circle"></i>${s}</span>`).join('')}
                </div>
                <div class="mt-4 d-flex gap-2 flex-wrap">
                    <button class="btn btn-primary btn-sm" onclick="app.navigate('pricing')">
                        <i class="fas fa-bolt"></i> এই জোনে জয়েন করুন
                    </button>
                    <button class="btn btn-outline-primary btn-sm" onclick="hero3D.loadModel('${active.modelType}'); window.scrollTo({top: 0, behavior: 'smooth'});">
                        <i class="fas fa-vr-cardboard"></i> উপরে 3D মডেলে দেখুন
                    </button>
                </div>
            </div>
        `;
    },

    selectZone: function (index) {
        this.renderZoneExplorer(index);
        const zone = GYM_ZONES[index];
        if (zone && zone.modelType) {
            hero3D.loadModel(zone.modelType);
        }
    },

    renderServices: function () {
        const container = document.getElementById('services-grid');
        if (!container) return;

        container.innerHTML = GYM_SERVICES.map(s => `
            <div class="service-item tilt-card">
                <div class="service-img-box"><img src="${s.img}" alt="${s.title}"></div>
                <div class="service-content tilt-depth">
                    <h3 class="service-title"><i class="fas ${s.icon}"></i> ${s.title}</h3>
                    <p class="service-desc">${s.desc}</p>
                </div>
            </div>
        `).join('');
        tiltEngine.bindAll();
    },

    renderWallets: function (filter) {
        const container = document.getElementById('wallet-products-grid');
        if (!container) return;

        const filtered = filter === 'all'
            ? WALLET_INVENTORY
            : WALLET_INVENTORY.filter(w => w.category === filter);

        container.innerHTML = filtered.map(w => {
            const oldPriceHtml = w.oldPrice ? `<span class="product-old-price">৳${w.oldPrice}</span>` : '';
            const badgeHtml = w.badge ? `<span class="badge badge-gold">${w.badge}</span>` : '';
            const stockHtml = w.stock ? '' : `<span class="stock-badge">Out of Stock</span>`;
            const actionBtn = w.stock
                ? `<button class="btn btn-gold btn-sm" style="flex:1;" onclick="cartApp.addToCart('${w.id}')"><i class="fas fa-cart-plus"></i> ব্যাগে যোগ</button>`
                : `<button class="btn btn-dark btn-sm" style="flex:1;" disabled>স্টক নেই</button>`;

            return `
                <div class="product-card tilt-card">
                    <div class="product-img-wrap">
                        <div class="product-badges">${badgeHtml}</div>
                        ${stockHtml}
                        <img src="${w.img}" alt="${w.name}" class="product-img">
                    </div>
                    <div class="product-info tilt-depth">
                        <span class="product-cat">${w.category}</span>
                        <h3 class="product-title">${w.name}</h3>
                        <div class="product-price-row">
                            <span class="product-price">৳${w.price}</span>
                            ${oldPriceHtml}
                        </div>
                        <div class="product-action-row">
                            ${actionBtn}
                            <button class="btn btn-outline-gold btn-sm" title="Inspect in 3D" onclick="app.inspectWallet3D(${w.colorHex}, '${w.name}')">
                                <i class="fas fa-cube"></i> 3D
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        tiltEngine.bindAll();
    },

    inspectWallet3D: function (colorHex, walletName) {
        wallet3D.setColor(colorHex);
        const titleEl = document.getElementById('wallet-3d-active-title');
        if (titleEl) titleEl.innerText = walletName;
        const bar = document.getElementById('wallet-3d-inspector');
        if (bar) bar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        ui.showToast(`3D ভিউতে "${walletName}" লোড হয়েছে!`, 'gold');
    },

    calculateBMI: function () {
        const weight = parseFloat(document.getElementById('bmi-weight').value);
        const heightCm = parseFloat(document.getElementById('bmi-height').value);
        const age = parseFloat(document.getElementById('bmi-age')?.value) || 25;
        const detailsEl = document.getElementById('bmi-dynamic-details');

        if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
            ui.showToast('দয়া করে সঠিক ওজন (KG) এবং উচ্চতা (CM) দিন!', 'error');
            return;
        }

        const heightM = heightCm / 100;
        const bmi = (weight / (heightM * heightM)).toFixed(1);

        // Estimate Daily Calorie Maintenance (Mifflin-St Jeor approx)
        const bmr = Math.round(10 * weight + 6.25 * heightCm - 5 * age + 5);
        const tdee = Math.round(bmr * 1.55);
        const proteinG = Math.round(weight * 2.0);

        let status = '', colorCss = '', hexColor = 0x00e676, position = 50, scaleWidth = 1.0, advice = '';

        if (bmi < 18.5) {
            status = 'আন্ডারওয়েট (ওজন বাড়ানো প্রয়োজন)';
            colorCss = 'var(--info)';
            hexColor = 0x00b0ff;
            position = (bmi / 18.5) * 25;
            scaleWidth = 0.78;
            advice = 'মাসল গেইন প্রোগ্রাম এবং সারপ্লাস ক্যালরি ডায়েট শুরু করুন।';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = 'স্বাভাবিক ও ফিট (Ideal Fitness)';
            colorCss = 'var(--success-light)';
            hexColor = 0x00e676;
            position = 25 + ((bmi - 18.5) / 6.4) * 25;
            scaleWidth = 1.0;
            advice = 'দারুণ! আপনার ফিটনেস ধরে রাখতে স্ট্রেন্থ ও কার্ডিও ব্যালেন্স করে চালিয়ে যান।';
        } else if (bmi >= 25 && bmi <= 29.9) {
            status = 'ওভারওয়েট (ফ্যাট বার্ন প্রয়োজন)';
            colorCss = 'var(--warning-light)';
            hexColor = 0xffab00;
            position = 50 + ((bmi - 25) / 4.9) * 25;
            scaleWidth = 1.25;
            advice = 'আমাদের প্রিমিয়াম প্যাকেজের StairMaster ও HIIT কার্ডিও সেশন আপনার জন্য সেরা।';
        } else {
            status = 'ওবেসিটি (দ্রুত ওজন কমানো জরুরি)';
            colorCss = 'var(--danger-light)';
            hexColor = 0xff5252;
            position = 75 + Math.min(22, ((bmi - 30) / 10) * 25);
            scaleWidth = 1.48;
            advice = 'প্রো-ট্রেইনারের তত্ত্বাবধানে ফ্যাট লস ও স্টেয়ার ক্লাইম্বার প্রোগ্রাম আজই শুরু করুন।';
        }

        position = Math.max(3, Math.min(97, position));
        bmi3D.updateBiometrics(hexColor, scaleWidth);

        if (detailsEl) {
            detailsEl.innerHTML = `
                <div style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase;">আপনার 3D Biometric BMI</div>
                <h3 style="font-size: 3rem; color: ${colorCss}; margin: 4px 0 10px; font-family: var(--font-en); line-height: 1;">${bmi}</h3>
                <div style="background: ${colorCss}; color: #000; padding: 4px 14px; border-radius: 20px; font-weight: 700; display: inline-block; font-size: 0.9rem;">${status}</div>
                
                <div class="bmi-meter-container">
                    <div class="bmi-segment underweight"></div>
                    <div class="bmi-segment normal"></div>
                    <div class="bmi-segment overweight"></div>
                    <div class="bmi-segment obese"></div>
                    <div class="bmi-indicator" style="left: ${position}%;"></div>
                </div>

                <div class="macro-pills">
                    <div class="macro-pill">
                        <span>দৈনিক ক্যালরি</span>
                        <strong>${tdee} kcal</strong>
                    </div>
                    <div class="macro-pill">
                        <span>প্রোটিন টার্গেট</span>
                        <strong>${proteinG}g / দিন</strong>
                    </div>
                    <div class="macro-pill">
                        <span>ওয়াটার ইনটেক</span>
                        <strong>${(weight * 0.04).toFixed(1)} L</strong>
                    </div>
                </div>
                <p style="font-size: 0.88rem; color: #ddd; margin: 12px 0 0;">${advice}</p>
            `;
        }
        ui.showToast(`আপনার BMI স্কোর: ${bmi} (${status})`, 'success');
    },

    enrollPackage: function (packageName, price) {
        checkoutApp.openDirectPackageCheckout(packageName, price);
    },

    renderWorkoutRoutine: function () {
        const tbody = document.getElementById('routine-tbody');
        const progressEl = document.getElementById('workout-progress-label');
        if (!tbody) return;

        const doneCount = WORKOUT_ROUTINES.filter(w => w.done).length;
        if (progressEl) {
            progressEl.innerText = `${doneCount}/${WORKOUT_ROUTINES.length} Completed`;
        }

        tbody.innerHTML = WORKOUT_ROUTINES.map((w, idx) => `
            <tr class="${w.done ? 'completed-row' : ''}" onclick="app.toggleWorkoutStep(${idx})" style="cursor:pointer;">
                <td>
                    <button class="workout-check-btn ${w.done ? 'checked' : ''}">
                        <i class="fas fa-check"></i>
                    </button>
                </td>
                <td><strong>${w.name}</strong></td>
                <td class="font-en">${w.sets}</td>
                <td class="font-en">${w.reps}</td>
            </tr>
        `).join('');
    },

    toggleWorkoutStep: function (idx) {
        if (!WORKOUT_ROUTINES[idx]) return;
        WORKOUT_ROUTINES[idx].done = !WORKOUT_ROUTINES[idx].done;
        this.renderWorkoutRoutine();
        if (WORKOUT_ROUTINES[idx].done) {
            ui.showToast(`"${WORKOUT_ROUTINES[idx].name}" সম্পন্ন হয়েছে! 💪`, 'success');
        }
    },

    toggleAttendanceDay: function (el) {
        if (el.classList.contains('present')) {
            el.classList.remove('present');
            el.classList.add('absent');
            el.querySelector('i').className = 'fas fa-times';
        } else {
            el.classList.remove('absent');
            el.classList.add('present');
            el.querySelector('i').className = 'fas fa-check';
            ui.showToast('হাজিরা আপডেট করা হয়েছে!', 'success');
        }
    }
};

/* ============================================================================
   7. SHOPPING CART & UNIFIED CHECKOUT (WALLETS + GYM MEMBERSHIPS)
   ============================================================================ */
const cartApp = {
    items: [],
    deliveryFee: 60,

    addToCart: function (productId) {
        const product = WALLET_INVENTORY.find(p => p.id === productId);
        if (!product) return;

        const existing = this.items.find(item => item.id === productId);
        if (existing) existing.qty += 1;
        else this.items.push({ ...product, qty: 1 });

        this.updateCartUI();
        ui.showToast(`"${product.name}" ব্যাগে যোগ করা হয়েছে!`, 'gold');
        this.openCart();
    },

    removeFromCart: function (productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCartUI();
    },

    updateQty: function (productId, delta) {
        const item = this.items.find(i => i.id === productId);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) this.removeFromCart(productId);
        else this.updateCartUI();
    },

    updateCartUI: function () {
        const totalItems = this.items.reduce((sum, item) => sum + item.qty, 0);
        const topCount = document.getElementById('top-cart-count');
        const deskCount = document.getElementById('desktop-cart-count');
        if (topCount) topCount.innerText = totalItems;
        if (deskCount) deskCount.innerText = totalItems;

        document.querySelectorAll('.cart-trigger').forEach(t => {
            t.classList.toggle('has-items', totalItems > 0);
        });

        const container = document.getElementById('cart-items-container');
        const emptyMsg = document.getElementById('empty-cart-msg');
        const checkoutBtn = document.getElementById('checkout-btn');
        if (!container) return;

        Array.from(container.children).forEach(child => {
            if (child.id !== 'empty-cart-msg') child.remove();
        });

        if (this.items.length === 0) {
            if (emptyMsg) emptyMsg.style.display = 'block';
            if (checkoutBtn) checkoutBtn.disabled = true;
            document.getElementById('cart-subtotal').innerText = '৳০';
            document.getElementById('cart-total').innerText = '৳০';
            return;
        }

        if (emptyMsg) emptyMsg.style.display = 'none';
        if (checkoutBtn) checkoutBtn.disabled = false;

        let subtotal = 0;
        this.items.forEach(item => {
            subtotal += item.price * item.qty;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">৳${item.price}</div>
                    <div class="cart-item-actions">
                        <div class="qty-control">
                            <div class="qty-btn" onclick="cartApp.updateQty('${item.id}', -1)"><i class="fas fa-minus"></i></div>
                            <div class="qty-val">${item.qty}</div>
                            <div class="qty-btn" onclick="cartApp.updateQty('${item.id}', 1)"><i class="fas fa-plus"></i></div>
                        </div>
                        <div class="cart-item-remove" onclick="cartApp.removeFromCart('${item.id}')"><i class="fas fa-trash-alt"></i> মুছুন</div>
                    </div>
                </div>
            `;
            container.appendChild(itemEl);
        });

        const grandTotal = subtotal + this.deliveryFee;
        document.getElementById('cart-subtotal').innerText = `৳${subtotal}`;
        document.getElementById('cart-total').innerText = `৳${grandTotal}`;
    },

    openCart: function () {
        document.getElementById('cart-overlay')?.classList.add('active');
        document.getElementById('cart-sidebar')?.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeCart: function () {
        document.getElementById('cart-overlay')?.classList.remove('active');
        document.getElementById('cart-sidebar')?.classList.remove('active');
        document.body.style.overflow = '';
    },

    clearCart: function () {
        this.items = [];
        this.updateCartUI();
    }
};

const checkoutApp = {
    currentStep: 1,
    selectedMethod: 'cod',
    checkoutMode: 'wallet', // 'wallet' or 'membership'
    packageData: null,

    openCheckout: function () {
        this.checkoutMode = 'wallet';
        this.packageData = null;
        cartApp.closeCart();
        const totalText = document.getElementById('cart-total').innerText;
        this.setAmounts(totalText);
        document.getElementById('checkout-modal-overlay').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.goToStep(1);
    },

    openDirectPackageCheckout: function (packageName, price) {
        this.checkoutMode = 'membership';
        this.packageData = { name: packageName, price: price };
        this.setAmounts(`৳${price}`);
        document.getElementById('checkout-modal-overlay').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.goToStep(1);
        ui.showToast(`"${packageName}" মেম্বারশিপ রেজিস্ট্রেশন শুরু হয়েছে`, 'success');
    },

    setAmounts: function (amountStr) {
        document.querySelectorAll('.invoice-amount').forEach(el => (el.innerText = amountStr));
        const gwTotal = document.getElementById('gw-total-display');
        if (gwTotal) gwTotal.innerText = amountStr;
        const invTotal = document.getElementById('inv-total');
        if (invTotal) invTotal.innerText = amountStr;
    },

    closeCheckout: function () {
        document.getElementById('checkout-modal-overlay').style.display = 'none';
        document.body.style.overflow = '';
    },

    goToStep: function (step) {
        if (step === 2) {
            const name = document.getElementById('chk-name').value.trim();
            const phone = document.getElementById('chk-phone').value.trim();
            const address = document.getElementById('chk-address').value.trim();

            let isValid = true;
            if (!name) { document.getElementById('err-name').style.display = 'block'; isValid = false; }
            else { document.getElementById('err-name').style.display = 'none'; }

            if (!phone || phone.length < 11) { document.getElementById('err-phone').style.display = 'block'; isValid = false; }
            else { document.getElementById('err-phone').style.display = 'none'; }

            if (!address) { document.getElementById('err-address').style.display = 'block'; isValid = false; }
            else { document.getElementById('err-address').style.display = 'none'; }

            if (!isValid) return;

            document.getElementById('inv-name').innerText = name;
            document.getElementById('inv-phone').innerText = phone;
        }

        this.currentStep = step;
        document.querySelectorAll('.step').forEach((el, idx) => {
            el.classList.remove('active', 'completed');
            if (idx + 1 < step) el.classList.add('completed');
            else if (idx + 1 === step) el.classList.add('active');
        });

        document.querySelectorAll('.checkout-panel').forEach(el => el.classList.remove('active'));
        document.getElementById(`panel-${step}`)?.classList.add('active');

        if (step === 2) this.selectMethod('cod');
    },

    selectMethod: function (method) {
        this.selectedMethod = method;
        document.querySelectorAll('.gw-screen').forEach(el => (el.style.display = 'none'));
        const targetUi = document.getElementById(`ui-${method}`);
        if (targetUi) targetUi.style.display = 'block';
        document.getElementById('inv-method').innerText = method.toUpperCase();
    },

    processPayment: function (method) {
        if (method === 'bkash') {
            if (document.getElementById('bkash-acc').value.length < 11 || document.getElementById('bkash-pin').value.length < 4) {
                ui.showToast('সঠিক bKash নম্বর এবং PIN দিন!', 'error');
                return;
            }
        } else if (method === 'nagad') {
            if (document.getElementById('nagad-acc').value.length < 11 || document.getElementById('nagad-pin').value.length < 4) {
                ui.showToast('সঠিক Nagad নম্বর এবং PIN দিন!', 'error');
                return;
            }
        }

        this.goToStep(3);
        document.getElementById('processing-view').style.display = 'block';
        document.getElementById('success-view').style.display = 'none';

        setTimeout(() => {
            document.getElementById('processing-view').style.display = 'none';
            document.getElementById('success-view').style.display = 'flex';

            const userName = document.getElementById('chk-name').value.trim();

            if (this.checkoutMode === 'membership' && this.packageData) {
                // Update 3D Holographic Member ID Card in Portal!
                const idName = document.getElementById('portal-member-name');
                const idPlan = document.getElementById('portal-member-plan');
                const idNum = document.getElementById('portal-member-id');
                if (idName) idName.innerText = userName;
                if (idPlan) idPlan.innerText = this.packageData.name;
                if (idNum) idNum.innerText = `ID: TSF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
            } else {
                cartApp.clearCart();
            }
        }, 1600);
    },

    finishOrder: function () {
        const wasMembership = this.checkoutMode === 'membership';
        this.closeCheckout();
        document.getElementById('chk-name').value = '';
        document.getElementById('chk-phone').value = '';
        document.getElementById('chk-address').value = '';

        if (wasMembership) {
            app.navigate('portal');
            ui.showToast('অভিনন্দন! আপনার 3D মেম্বারশিপ কার্ড অ্যাক্টিভ হয়েছে!', 'success');
        } else {
            app.navigate('home');
            ui.showToast('ধন্যবাদ! আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে।', 'gold');
        }
    }
};

/* ============================================================================
   8. UNIVERSAL UI TOAST HELPER
   ============================================================================ */
const ui = {
    showToast: function (message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        let icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-triangle';
        if (type === 'gold') icon = 'fa-crown';

        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="toast-content">
                <div class="toast-msg">${message}</div>
            </div>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.35s ease forwards';
            setTimeout(() => toast.remove(), 350);
        }, 3400);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();

    document.getElementById('cart-overlay')?.addEventListener('click', () => cartApp.closeCart());
    document.getElementById('checkout-modal-overlay')?.addEventListener('click', function (e) {
        if (e.target === this && checkoutApp.currentStep !== 3) {
            checkoutApp.closeCheckout();
        }
    });
});
