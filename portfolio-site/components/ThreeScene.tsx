"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { NavigationHUD } from './NavigationHUD';
import { ContentOverlay } from './ContentOverlay';
import { InteractionPrompt } from './InteractionPrompt';

// Helper to create a sign with post and board for planet labels
const createSignSprite = (text: string, color: string): THREE.Sprite => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  // Canvas for sign with post
  canvas.width = 512;
  canvas.height = 512;
  
  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw post (vertical pole in center bottom)
  const postWidth = 20;
  const postHeight = 180;
  const postX = canvas.width / 2 - postWidth / 2;
  const postY = canvas.height - postHeight;
  
  // Post shadow
  context.fillStyle = 'rgba(0, 0, 0, 0.5)';
  context.fillRect(postX + 3, postY + 3, postWidth, postHeight);
  
  // Post (wood-like color with gradient)
  const postGradient = context.createLinearGradient(postX, postY, postX + postWidth, postY);
  postGradient.addColorStop(0, '#8B4513');
  postGradient.addColorStop(0.5, '#A0522D');
  postGradient.addColorStop(1, '#8B4513');
  context.fillStyle = postGradient;
  context.fillRect(postX, postY, postWidth, postHeight);
  
  // Post highlight
  context.fillStyle = 'rgba(255, 255, 255, 0.2)';
  context.fillRect(postX, postY, postWidth / 2, postHeight);
  
  // Sign board (horizontal rectangle above post)
  const boardWidth = 320;
  const boardHeight = 120;
  const boardX = canvas.width / 2 - boardWidth / 2;
  const boardY = postY - boardHeight - 10;
  
  // Board shadow
  context.fillStyle = 'rgba(0, 0, 0, 0.6)';
  context.fillRect(boardX + 4, boardY + 4, boardWidth, boardHeight);
  
  // Board background (dark with border)
  context.fillStyle = 'rgba(20, 20, 30, 0.95)';
  context.fillRect(boardX, boardY, boardWidth, boardHeight);
  
  // Board border (glowing)
  context.strokeStyle = color;
  context.lineWidth = 6;
  context.shadowColor = color;
  context.shadowBlur = 15;
  context.strokeRect(boardX + 3, boardY + 3, boardWidth - 6, boardHeight - 6);
  
  // Reset shadow for text
  context.shadowColor = 'transparent';
  context.shadowBlur = 0;
  
  // Draw text on sign board
  context.fillStyle = color;
  context.font = 'bold 64px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  
  // Text glow
  context.shadowColor = color;
  context.shadowBlur = 20;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.fillText(text, canvas.width / 2, boardY + boardHeight / 2);
  
  // Text again for crispness
  context.shadowColor = 'transparent';
  context.shadowBlur = 0;
  context.fillText(text, canvas.width / 2, boardY + boardHeight / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const spriteMaterial = new THREE.SpriteMaterial({ 
    map: texture,
    transparent: true,
    alphaTest: 0.05,
    depthTest: false, // Always render on top
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  // Scale for sign visibility
  sprite.scale.set(60, 60, 1);
  return sprite;
};

type Section = 'hero' | 'about' | 'projects' | 'skills' | 'contact';

type NavigationMode = 'default' | 'exploration';

export function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const currentSectionRef = useRef<Section>('hero'); // Ref to track current section for event handlers
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<Section | null>(null);
  const [navigationMode, setNavigationMode] = useState<NavigationMode>('default');
  const isModeTransitioningRef = useRef(false);
  const sceneRef = useRef<any>(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const [cameraVelocity] = useState(new THREE.Vector3());
  
  // Keep ref in sync with state
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  const navigateToSection = useCallback((section: Section) => {
    // Only prevent navigation if we're currently transitioning
    if (isTransitioning) return;
    
    // Allow navigation even to the same section (for wrap-around cases)
    // The camera will just smoothly move to the same position
    
    setIsTransitioning(true);
    setCurrentSection(section);
    
    if (sceneRef.current) {
      const sectionData = sceneRef.current.sectionData[section];
      const newTarget = sectionData.position.clone();
      newTarget.z += 50; // Camera offset from section
      
      sceneRef.current.targetPosition.copy(newTarget);
      sceneRef.current.isNavigating = true;
    }

    setTimeout(() => {
      setIsTransitioning(false);
      if (sceneRef.current) {
        sceneRef.current.isNavigating = false;
      }
    }, 1200); // Reduced since everything is preloaded
  }, [currentSection, isTransitioning]);

  // Update navigation mode in scene ref and show/hide planets
  useEffect(() => {
    if (!sceneRef.current) return;
    
    sceneRef.current.navigationMode = navigationMode;
    
    // Show/hide planets and labels based on mode with smooth transitions
    if (sceneRef.current.planetMeshes) {
      sceneRef.current.planetMeshes.forEach((planet: THREE.Mesh, index: number) => {
        const glow = sceneRef.current.scene.children.find((child: THREE.Object3D) => 
          (child as THREE.Mesh).userData?.isGlow && (child as THREE.Mesh).userData?.section === planet.userData.section
        ) as THREE.Mesh | undefined;
        
        const label = sceneRef.current.planetLabels?.[index] as THREE.Sprite;
        
        if (navigationMode === 'exploration') {
          // Smoothly animate planets in
          const targetScale = planet.userData.originalScale || 1;
          const startScale = planet.scale.x;
          const startTime = Date.now();
          const duration = 800; // 800ms transition
          
          const animatePlanet = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic for smooth animation
            const eased = 1 - Math.pow(1 - progress, 3);
            const newScale = startScale + (targetScale - startScale) * eased;
            
            planet.scale.setScalar(newScale);
            if (glow) glow.scale.setScalar(newScale * 1.4);
            
            // Animate label - always show when planet is visible
            if (label) {
              // Use a fixed scale for labels so they're always readable
              const labelScale = 1.0; // Fixed scale for consistent visibility
              label.scale.setScalar(labelScale);
              label.visible = true; // Always visible when in exploration mode
            }
            
            // Enable interaction only when fully visible
            planet.visible = newScale > 0.1;
            
            if (progress < 1) {
              requestAnimationFrame(animatePlanet);
            } else {
              planet.scale.setScalar(targetScale);
              if (glow) glow.scale.setScalar(targetScale * 1.4);
              planet.visible = true;
              if (label) {
                // Keep labels at fixed scale for maximum visibility
                label.scale.setScalar(1.0);
                label.visible = true; // Always visible in exploration mode
              }
            }
          };
          animatePlanet();
        } else {
          // In default mode, keep labels visible but hide planets
          planet.visible = false; // Disable immediately to prevent clicks
          // Keep labels visible in default mode
          if (label) {
            label.visible = true;
            label.scale.setScalar(1.0);
          }
          const startScale = planet.scale.x;
          const startTime = Date.now();
          const duration = 400; // 400ms transition out
          
          const hidePlanet = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease in cubic for smooth animation
            const eased = Math.pow(progress, 3);
            const newScale = startScale * (1 - eased);
            
            planet.scale.setScalar(newScale);
            if (glow) glow.scale.setScalar(newScale * 1.4);
            // Keep labels visible and at full scale in default mode
            if (label) {
              label.visible = true;
              label.scale.setScalar(1.0);
            }
            
            if (progress < 1) {
              requestAnimationFrame(hidePlanet);
            } else {
              planet.scale.setScalar(0);
              if (glow) glow.scale.setScalar(0);
              // Labels stay visible in default mode
              if (label) {
                label.visible = true;
                label.scale.setScalar(1.0);
              }
            }
          };
          hidePlanet();
        }
      });
    }
    
    // Update camera position for exploration mode with smooth transition
    if (navigationMode === 'exploration' && sceneRef.current.explorationCamera) {
      const center = new THREE.Vector3(0, 0, 0); // Center is now at origin
      const expCam = sceneRef.current.explorationCamera;
      
      // Reset to optimal viewing position when entering exploration mode
      if (!expCam.initialized) {
        // Smoothly transition camera to exploration position
        const currentPos = sceneRef.current.camera.position.clone();
        expCam.theta = Math.PI / 4; // 45 degrees for diagonal view
        expCam.phi = Math.PI / 2.5; // Slightly above horizontal
        expCam.radius = 200; // Optimal distance to see all planets and center cone
        expCam.initialized = true;
      }
      
      const x = center.x + expCam.radius * Math.sin(expCam.phi) * Math.cos(expCam.theta);
      const y = center.y + expCam.radius * Math.cos(expCam.phi);
      const z = center.z + expCam.radius * Math.sin(expCam.phi) * Math.sin(expCam.theta);
      sceneRef.current.targetPosition.set(x, y, z);
    } else if (navigationMode === 'default' && sceneRef.current.explorationCamera) {
      // Reset initialization flag when leaving exploration mode
      sceneRef.current.explorationCamera.initialized = false;
    }
  }, [navigationMode]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Preload Three.js resources
    const preloadGeometry = () => {
      // Pre-create common geometries to avoid runtime creation delays
      new THREE.TorusGeometry(1, 0.1, 8, 16);
      new THREE.BoxGeometry(1, 1, 1);
      new THREE.SphereGeometry(1, 8, 8);
      new THREE.IcosahedronGeometry(1, 0);
      new THREE.OctahedronGeometry(1);
      new THREE.TetrahedronGeometry(1);
      new THREE.DodecahedronGeometry(1);
      new THREE.ConeGeometry(1, 2, 4);
    };
    preloadGeometry();

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000510, 0.006); // Slight fog for depth

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000510, 1);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    containerRef.current.appendChild(renderer.domElement);

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Enhanced particle field with depth
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 10000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 800;
      positions[i3 + 1] = (Math.random() - 0.5) * 800;
      positions[i3 + 2] = (Math.random() - 0.5) * 800;

      const color = new THREE.Color();
      color.setHSL(0.55 + Math.random() * 0.3, 0.7, 0.4 + Math.random() * 0.4);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Section data - positions will be set near planets after planet positions are calculated
    const sectionData: { [key in Section]: { 
      position: THREE.Vector3; 
      group: THREE.Group;
      meshes: THREE.Mesh[];
      interactiveMeshes: THREE.Mesh[];
      color: number;
    }} = {
      hero: { 
        position: new THREE.Vector3(0, 0, 0), 
        group: new THREE.Group(),
        meshes: [],
        interactiveMeshes: [],
        color: 0x3b82f6
      },
      about: { 
        position: new THREE.Vector3(0, 0, 0), // Will be updated to near planet
        group: new THREE.Group(),
        meshes: [],
        interactiveMeshes: [],
        color: 0xa855f7
      },
      projects: { 
        position: new THREE.Vector3(0, 0, 0), // Will be updated to near planet
        group: new THREE.Group(),
        meshes: [],
        interactiveMeshes: [],
        color: 0x6366f1
      },
      skills: { 
        position: new THREE.Vector3(0, 0, 0), // Will be updated to near planet
        group: new THREE.Group(),
        meshes: [],
        interactiveMeshes: [],
        color: 0x8b5cf6
      },
      contact: { 
        position: new THREE.Vector3(0, 0, 0), // Will be updated to near planet
        group: new THREE.Group(),
        meshes: [],
        interactiveMeshes: [],
        color: 0xec4899
      },
    };

    // HERO SECTION - Central spiral (restored original design)
    const heroGroup = sectionData.hero.group;
    heroGroup.position.copy(sectionData.hero.position);
    
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.TorusGeometry(7 + i * 2.5, 0.5, 16, 100);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.58 + i * 0.02, 0.8, 0.5),
        wireframe: true,
        transparent: true,
        opacity: 0.6, // Increased opacity for better visibility
      });
      const torus = new THREE.Mesh(geometry, material);
      torus.rotation.x = Math.PI / 2;
      torus.position.y = i * 2;
      torus.userData = { section: 'hero', originalOpacity: 0.6 };
      heroGroup.add(torus);
      sectionData.hero.meshes.push(torus);
      if (i % 3 === 0) {
        sectionData.hero.interactiveMeshes.push(torus);
      }
    }
    
    // Add invisible collision spheres around hero spiral for easier clicking
    // Create larger invisible spheres that are easier to click
    for (let i = 0; i < 5; i++) {
      const collisionGeometry = new THREE.SphereGeometry(25 + i * 5, 16, 16);
      const collisionMaterial = new THREE.MeshBasicMaterial({
        visible: false, // Invisible but clickable
        transparent: true,
        opacity: 0,
      });
      const collisionSphere = new THREE.Mesh(collisionGeometry, collisionMaterial);
      collisionSphere.position.y = i * 6 - 12;
      collisionSphere.userData = { section: 'hero', isCollision: true };
      heroGroup.add(collisionSphere);
      sectionData.hero.interactiveMeshes.push(collisionSphere);
    }
    
    scene.add(heroGroup);

    // ABOUT SECTION - Geometric constellation (position will be set near planet)
    const aboutGroup = sectionData.about.group;
    // Position will be updated after planets are positioned
    
    const aboutShapes = [
      { geometry: new THREE.IcosahedronGeometry(12, 0), scale: 1 },
      { geometry: new THREE.OctahedronGeometry(10), scale: 1 },
      { geometry: new THREE.TetrahedronGeometry(11), scale: 1 },
      { geometry: new THREE.DodecahedronGeometry(9), scale: 1 },
    ];
    
    aboutShapes.forEach((shape, i) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.73 + i * 0.04, 0.7, 0.6),
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const mesh = new THREE.Mesh(shape.geometry, material);
      const angle = (i / aboutShapes.length) * Math.PI * 2;
      mesh.position.set(
        Math.cos(angle) * 22,
        Math.sin(angle) * 15,
        Math.sin(i * 2) * 10
      );
      mesh.userData = { section: 'about', originalOpacity: 0.5 };
      aboutGroup.add(mesh);
      sectionData.about.meshes.push(mesh);
      sectionData.about.interactiveMeshes.push(mesh);
    });
    scene.add(aboutGroup);

    // PROJECTS SECTION - Grid of cubes with depth (position will be set near planet)
    const projectsGroup = sectionData.projects.group;
    // Position will be updated after planets are positioned
    
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.BoxGeometry(8, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.65 + (i % 4) * 0.03, 0.8, 0.5),
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (i % 4) * 16 - 24,
        Math.floor(i / 4) * 16 - 16,
        (i % 3) * 10 - 10
      );
      cube.userData = { section: 'projects', originalOpacity: 0.5 };
      projectsGroup.add(cube);
      sectionData.projects.meshes.push(cube);
      if (i % 2 === 0) {
        sectionData.projects.interactiveMeshes.push(cube);
      }
    }
    scene.add(projectsGroup);

    // SKILLS SECTION - Spiral galaxy (position will be set near planet)
    const skillsGroup = sectionData.skills.group;
    // Position will be updated after planets are positioned
    
    for (let i = 0; i < 30; i++) {
      const geometry = new THREE.SphereGeometry(2.5, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.77 + i * 0.01, 0.9, 0.6),
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const sphere = new THREE.Mesh(geometry, material);
      const angle = i * 0.7;
      const radius = i * 2.5;
      sphere.position.set(
        Math.cos(angle) * radius,
        i * 2.5 - 35,
        Math.sin(angle) * radius
      );
      sphere.userData = { section: 'skills', originalOpacity: 0.4 };
      skillsGroup.add(sphere);
      sectionData.skills.meshes.push(sphere);
      if (i % 4 === 0) {
        sectionData.skills.interactiveMeshes.push(sphere);
      }
    }
    scene.add(skillsGroup);

    // CONTACT SECTION - Ring structure with satellites (position will be set near planet)
    const contactGroup = sectionData.contact.group;
    // Position will be updated after planets are positioned
    
    const ringGeometry = new THREE.TorusGeometry(20, 3, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.userData = { section: 'contact', originalOpacity: 0.5 };
    contactGroup.add(ring);
    sectionData.contact.meshes.push(ring);
    sectionData.contact.interactiveMeshes.push(ring);
    
    for (let i = 0; i < 10; i++) {
      const geometry = new THREE.ConeGeometry(4, 8, 4);
      const material = new THREE.MeshBasicMaterial({
        color: 0xf472b6,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const cone = new THREE.Mesh(geometry, material);
      const angle = (i / 10) * Math.PI * 2;
      cone.position.set(
        Math.cos(angle) * 30,
        Math.sin(angle) * 30,
        Math.sin(i) * 10
      );
      cone.userData = { section: 'contact', originalOpacity: 0.4 };
      contactGroup.add(cone);
      sectionData.contact.meshes.push(cone);
      if (i % 3 === 0) {
        sectionData.contact.interactiveMeshes.push(cone);
      }
    }
    scene.add(contactGroup);

    // Create flowing connection paths
    const createFlowingPath = (start: THREE.Vector3, end: THREE.Vector3) => {
      const points = [];
      const segments = 100;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const point = new THREE.Vector3().lerpVectors(start, end, t);
        // Create flowing curve
        const curveHeight = Math.sin(t * Math.PI) * 25;
        point.y += curveHeight;
        point.x += Math.sin(t * Math.PI * 2) * 10;
        points.push(point);
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x3b82f6, 
        transparent: true, 
        opacity: 0.2 
      });
      return new THREE.Line(geometry, material);
    };

    const paths = [
      createFlowingPath(sectionData.hero.position, sectionData.about.position),
      createFlowingPath(sectionData.about.position, sectionData.projects.position),
      createFlowingPath(sectionData.projects.position, sectionData.skills.position),
      createFlowingPath(sectionData.skills.position, sectionData.contact.position),
    ];
    paths.forEach(path => scene.add(path));

    // Add ambient light points at each section with enhanced glow
    Object.values(sectionData).forEach(data => {
      // Main light point
      const lightGeometry = new THREE.SphereGeometry(2, 16, 16);
      const lightMaterial = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.8,
      });
      const lightSphere = new THREE.Mesh(lightGeometry, lightMaterial);
      lightSphere.position.copy(data.position);
      scene.add(lightSphere);
      
      // Glow effect around light
      const glowGeometry = new THREE.SphereGeometry(4, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.3,
      });
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      glowSphere.position.copy(data.position);
      scene.add(glowSphere);
    });

    // Create planet meshes for exploration mode
    // Position planets in a circular orbit around center
    const planetMeshes: THREE.Mesh[] = [];
    const planetLabels: THREE.Sprite[] = [];
    const sectionLabels: { [key in Section]: string } = {
      hero: 'Home (Sun)',
      about: 'About (Saturn)',
      projects: 'Projects (Jupiter)',
      skills: 'Skills (Neptune)',
      contact: 'Contact (Mars)',
    };
    
    // Add label for center Home (Sun)
    const heroLabelText = sectionLabels.hero;
    const heroColor = sectionData.hero.color;
    const heroSignSprite = createSignSprite(heroLabelText, `#${heroColor.toString(16).padStart(6, '0')}`);
    heroSignSprite.position.copy(sectionData.hero.position);
    heroSignSprite.position.y += 45; // Position sign above center
    heroSignSprite.userData = { section: 'hero', isLabel: true };
    heroSignSprite.scale.setScalar(1.0); // Always visible
    heroSignSprite.visible = true; // Always visible
    heroSignSprite.renderOrder = 999; // Render on top
    scene.add(heroSignSprite);
    planetLabels.push(heroSignSprite);
    
    // Arrange planets in a circular orbit around the center
    // Hero (Home) is the center spiral (not a planet), others orbit around it
    const orbitRadius = 120; // Distance from center for orbiting planets
    const orbitHeight = 0; // Keep planets at same height as center
    const orbitingSections: Section[] = ['about', 'projects', 'skills', 'contact'];
    const planetPositions: { [key in Section]: THREE.Vector3 } = {
      hero: new THREE.Vector3(0, 0, 0), // Center (home) - where the spiral is (not a planet)
      about: new THREE.Vector3(0, 0, 0), // Will be updated below
      projects: new THREE.Vector3(0, 0, 0), // Will be updated below
      skills: new THREE.Vector3(0, 0, 0), // Will be updated below
      contact: new THREE.Vector3(0, 0, 0), // Will be updated below
    };
    
    // Position orbiting planets evenly around the circle in a horizontal plane
    orbitingSections.forEach((section, index) => {
      const angle = (index / orbitingSections.length) * Math.PI * 2 - Math.PI / 2; // Start at top
      const planetPos = new THREE.Vector3(
        orbitRadius * Math.cos(angle),
        orbitHeight,
        orbitRadius * Math.sin(angle)
      );
      planetPositions[section] = planetPos;
      
      // Update section position to be near its planet (slightly offset for visual interest)
      sectionData[section].position.copy(planetPos);
      sectionData[section].position.y += 20; // Slightly above planet
      sectionData[section].group.position.copy(sectionData[section].position);
    });
    
    // Create planets only for orbiting sections (NOT hero - that's the center spiral)
    orbitingSections.forEach((section) => {
      const data = sectionData[section];
      const planetPos = planetPositions[section];
      
      // Larger planets for better visibility
      const planetGeometry = new THREE.SphereGeometry(30, 32, 32); // Increased size
      const planetMaterial = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 1.0, // Full opacity for better visibility
        wireframe: false,
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.position.copy(planetPos);
      planet.userData = { section, isPlanet: true, originalScale: 1 };
      planet.scale.setScalar(0); // Start hidden
      planet.visible = false; // Start invisible to prevent accidental clicks
      scene.add(planet);
      planetMeshes.push(planet);
      
      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(30, 32, 32); // Match planet size
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.7, // Increased glow opacity
        side: THREE.BackSide,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(planetPos);
      glow.scale.setScalar(1.4);
      glow.userData = { section, isGlow: true };
      glow.scale.setScalar(0); // Start hidden
      scene.add(glow);
      
      // Add sign with post for planet - always visible
      const labelText = sectionLabels[section];
      const signSprite = createSignSprite(labelText, `#${data.color.toString(16).padStart(6, '0')}`);
      signSprite.position.copy(planetPos);
      signSprite.position.y += 45; // Position sign above planet (post will extend down)
      signSprite.userData = { section, isLabel: true };
      signSprite.scale.setScalar(1.0); // Always visible
      signSprite.visible = true; // Always visible
      // Make sign always face camera
      signSprite.renderOrder = 999; // Render on top
      scene.add(signSprite);
      planetLabels.push(signSprite);
    });

    // Store references
    const targetPosition = new THREE.Vector3(0, 0, 50);
    const explorationCamera = {
      theta: Math.PI / 4, // Horizontal rotation (45 degrees for better view)
      phi: Math.PI / 2.5, // Vertical rotation (slightly above horizontal for better view)
      radius: 200, // Distance from center (optimal for viewing all planets and center cone)
      isDragging: false,
      wasDragging: false, // Track if we just finished dragging
      dragStartX: 0,
      dragStartY: 0,
      lastMouseX: 0,
      lastMouseY: 0,
      initialized: false, // Track if camera has been initialized for exploration mode
    };
    
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      sectionData,
      raycaster,
      targetPosition,
      velocity: new THREE.Vector3(),
      isNavigating: false,
      planetMeshes,
      planetLabels,
      explorationCamera,
      navigationMode: 'default' as NavigationMode,
    };

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let hoveredMeshes: THREE.Mesh[] = [];

    // Touch/swipe handling for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isTouchActive = false;

    // Handle touch start for swipe detection and exploration mode
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        touchStartTime = Date.now();
        isTouchActive = true;

        // If in exploration mode, start dragging
        if (sceneRef.current?.navigationMode === 'exploration') {
          sceneRef.current.explorationCamera.isDragging = true;
          sceneRef.current.explorationCamera.wasDragging = false;
          sceneRef.current.explorationCamera.dragStartX = touchStartX;
          sceneRef.current.explorationCamera.dragStartY = touchStartY;
          sceneRef.current.explorationCamera.lastMouseX = touchStartX;
          sceneRef.current.explorationCamera.lastMouseY = touchStartY;
        }
      }
    };

    // Handle touch move for exploration mode dragging
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1 && isTouchActive) {
        const touch = event.touches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;

        // Handle drag in exploration mode
        if (sceneRef.current?.navigationMode === 'exploration' && sceneRef.current.explorationCamera.isDragging) {
          const deltaX = currentX - sceneRef.current.explorationCamera.lastMouseX;
          const deltaY = currentY - sceneRef.current.explorationCamera.lastMouseY;
          
          sceneRef.current.explorationCamera.theta -= deltaX * 0.01;
          sceneRef.current.explorationCamera.phi += deltaY * 0.01;
          
          // Enforce boundaries
          sceneRef.current.explorationCamera.phi = Math.max(0.4, Math.min(Math.PI - 0.4, sceneRef.current.explorationCamera.phi));
          
          sceneRef.current.explorationCamera.lastMouseX = currentX;
          sceneRef.current.explorationCamera.lastMouseY = currentY;
          
          // Prevent default to avoid scrolling
          event.preventDefault();
        }

        // Update mouse position for raycasting
        mouseX = (currentX / window.innerWidth) * 2 - 1;
        mouseY = -(currentY / window.innerHeight) * 2 + 1;
        mouse.x = mouseX;
        mouse.y = mouseY;
      }
    };

    // Handle touch end for swipe detection and exploration mode
    const handleTouchEnd = (event: TouchEvent) => {
      if (!isTouchActive) return;

      const touchEndTime = Date.now();
      const timeDiff = touchEndTime - touchStartTime;

      // Handle exploration mode drag end
      if (sceneRef.current?.navigationMode === 'exploration' && sceneRef.current.explorationCamera.isDragging) {
        const touch = event.changedTouches[0];
        const dragDistance = Math.sqrt(
          Math.pow(touch.clientX - sceneRef.current.explorationCamera.dragStartX, 2) +
          Math.pow(touch.clientY - sceneRef.current.explorationCamera.dragStartY, 2)
        );
        
        if (dragDistance > 5) {
          sceneRef.current.explorationCamera.wasDragging = true;
          setTimeout(() => {
            if (sceneRef.current) {
              sceneRef.current.explorationCamera.wasDragging = false;
            }
          }, 100);
        }
        
        sceneRef.current.explorationCamera.isDragging = false;
        isTouchActive = false;
        return;
      }

      // Handle swipe gestures in default mode
      if (sceneRef.current?.navigationMode === 'default' && timeDiff < 300 && event.changedTouches.length === 1) {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // Only trigger swipe if horizontal movement is greater than vertical (to avoid conflicts with scrolling)
        if (absDeltaX > absDeltaY && absDeltaX > 50) {
          const sections: Section[] = ['hero', 'about', 'projects', 'skills', 'contact'];
          const current = currentSectionRef.current;
          const currentIndex = sections.indexOf(current);

          if (currentIndex !== -1) {
            if (deltaX > 0) {
              // Swipe right - go to previous section
              const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
              navigateToSection(sections[prevIndex]);
              setShowPrompt(false);
            } else {
              // Swipe left - go to next section
              const nextIndex = (currentIndex + 1) % sections.length;
              navigateToSection(sections[nextIndex]);
              setShowPrompt(false);
            }
          }
        } else if (absDeltaX < 10 && absDeltaY < 10) {
          // Small movement - treat as tap, check for planet/hero clicks in exploration mode
          if (sceneRef.current?.navigationMode === 'exploration') {
            const touch = event.changedTouches[0];
            mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            // Check planets
            const visiblePlanets = sceneRef.current.planetMeshes.filter((p: THREE.Mesh) => p.visible && p.scale.x > 0.5);
            const intersects = raycaster.intersectObjects(visiblePlanets);
            if (intersects.length > 0) {
              const planet = intersects[0].object as THREE.Mesh;
              const section = planet.userData.section as Section;
              setNavigationMode('default');
              setTimeout(() => {
                navigateToSection(section);
                setShowPrompt(false);
              }, 100);
              isTouchActive = false;
              return;
            }

            // Check hero spiral
            const heroIntersects = raycaster.intersectObjects(sectionData.hero.interactiveMeshes);
            if (heroIntersects.length > 0) {
              setNavigationMode('default');
              setTimeout(() => {
                navigateToSection('hero');
                setShowPrompt(false);
              }, 100);
              isTouchActive = false;
              return;
            }
          }
        }
      }

      isTouchActive = false;
    };

    // Drag controls for exploration mode
    const handleMouseDown = (event: MouseEvent) => {
      if (sceneRef.current?.navigationMode === 'exploration') {
        sceneRef.current.explorationCamera.isDragging = true;
        sceneRef.current.explorationCamera.wasDragging = false;
        sceneRef.current.explorationCamera.dragStartX = event.clientX;
        sceneRef.current.explorationCamera.dragStartY = event.clientY;
        sceneRef.current.explorationCamera.lastMouseX = event.clientX;
        sceneRef.current.explorationCamera.lastMouseY = event.clientY;
      }
    };

    const handleMouseUp = () => {
      if (sceneRef.current) {
        // Check if we actually dragged (moved more than a few pixels)
        const dragDistance = Math.sqrt(
          Math.pow(sceneRef.current.explorationCamera.lastMouseX - sceneRef.current.explorationCamera.dragStartX, 2) +
          Math.pow(sceneRef.current.explorationCamera.lastMouseY - sceneRef.current.explorationCamera.dragStartY, 2)
        );
        
        if (dragDistance > 5) {
          // We dragged, mark it so click handler knows to ignore
          sceneRef.current.explorationCamera.wasDragging = true;
          // Clear the flag after a short delay to allow for intentional clicks
          setTimeout(() => {
            if (sceneRef.current) {
              sceneRef.current.explorationCamera.wasDragging = false;
            }
          }, 100);
        }
        
        sceneRef.current.explorationCamera.isDragging = false;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      mouse.x = mouseX;
      mouse.y = mouseY;

      // Handle drag in exploration mode
      if (sceneRef.current?.navigationMode === 'exploration' && sceneRef.current.explorationCamera.isDragging) {
        const deltaX = event.clientX - sceneRef.current.explorationCamera.lastMouseX;
        const deltaY = event.clientY - sceneRef.current.explorationCamera.lastMouseY;
        
        sceneRef.current.explorationCamera.theta -= deltaX * 0.01;
        sceneRef.current.explorationCamera.phi += deltaY * 0.01;
        
        // Enforce boundaries to keep solar system in view (tighter range)
        // Clamp phi to prevent going too high/low - tighter to keep all planets visible
        sceneRef.current.explorationCamera.phi = Math.max(0.4, Math.min(Math.PI - 0.4, sceneRef.current.explorationCamera.phi));
        
        // Optional: Allow zoom with scroll (but we'll keep radius fixed for now)
        // The radius boundaries are enforced in the animate loop
        
        sceneRef.current.explorationCamera.lastMouseX = event.clientX;
        sceneRef.current.explorationCamera.lastMouseY = event.clientY;
        return;
      }

      // Raycast for hover detection
      raycaster.setFromCamera(mouse, camera);
      
      // Reset previous hovers
      hoveredMeshes.forEach(mesh => {
        if (mesh.userData.isPlanet) {
          mesh.scale.setScalar(mesh.userData.originalScale || 1);
        } else {
          (mesh.material as THREE.MeshBasicMaterial).opacity = mesh.userData.originalOpacity;
        }
      });
      hoveredMeshes = [];

      let foundHover: Section | null = null;

      // Check planets in exploration mode (only if visible)
      if (sceneRef.current?.navigationMode === 'exploration' && sceneRef.current.planetMeshes) {
        // Filter to only visible planets
        const visiblePlanets = sceneRef.current.planetMeshes.filter((p: THREE.Mesh) => p.visible && p.scale.x > 0.5);
        const intersects = raycaster.intersectObjects(visiblePlanets);
        if (intersects.length > 0) {
          const planet = intersects[0].object as THREE.Mesh;
          foundHover = planet.userData.section as Section;
          planet.scale.setScalar((planet.userData.originalScale || 1) * 1.3);
          hoveredMeshes.push(planet);
        } else {
          // Also check for center spiral (hero section) hover in exploration mode
          const heroIntersects = raycaster.intersectObjects(sectionData.hero.interactiveMeshes);
          if (heroIntersects.length > 0) {
            foundHover = 'hero';
            // Highlight hero meshes
            sectionData.hero.meshes.forEach(mesh => {
              (mesh.material as THREE.MeshBasicMaterial).opacity = (mesh.userData.originalOpacity || 0.6) * 1.5;
              hoveredMeshes.push(mesh);
            });
          }
        }
      } else {
        // Default mode - check interactive meshes
        Object.entries(sectionData).forEach(([section, data]) => {
          const intersects = raycaster.intersectObjects(data.interactiveMeshes);
          if (intersects.length > 0 && section !== currentSection) {
            foundHover = section as Section;
            // Highlight all meshes in section
            data.meshes.forEach(mesh => {
              (mesh.material as THREE.MeshBasicMaterial).opacity = mesh.userData.originalOpacity * 1.8;
              hoveredMeshes.push(mesh);
            });
          }
        });
      }

      setHoveredSection(foundHover);
    };

    const handleClick = (event: MouseEvent) => {
      // Don't navigate if we're transitioning modes
      if (isModeTransitioningRef.current) {
        return;
      }

      // Don't navigate if we just finished dragging or are currently dragging
      if (sceneRef.current?.explorationCamera.isDragging || sceneRef.current?.explorationCamera.wasDragging) {
        return;
      }

      // Ignore clicks on UI elements (buttons, links, etc.)
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
        return;
      }

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check planets in exploration mode (only if planets are visible)
      if (sceneRef.current?.navigationMode === 'exploration' && sceneRef.current.planetMeshes) {
        // Filter to only visible planets
        const visiblePlanets = sceneRef.current.planetMeshes.filter((p: THREE.Mesh) => p.visible && p.scale.x > 0.5);
        const intersects = raycaster.intersectObjects(visiblePlanets);
        if (intersects.length > 0) {
          const planet = intersects[0].object as THREE.Mesh;
          const section = planet.userData.section as Section;
          
          // Switch to default mode first, then navigate (this will zoom in)
          setNavigationMode('default');
          // Small delay to ensure mode switch completes before navigation
          setTimeout(() => {
            navigateToSection(section);
            setShowPrompt(false);
          }, 100);
          return;
        }
        
        // Also check for center spiral (hero section) clicks in exploration mode
        const heroIntersects = raycaster.intersectObjects(sectionData.hero.interactiveMeshes);
        if (heroIntersects.length > 0) {
          // Clicked on center spiral - go home
          setNavigationMode('default');
          setTimeout(() => {
            navigateToSection('hero');
            setShowPrompt(false);
          }, 100);
        }
        return;
      }

      // Default mode - check interactive meshes
      Object.entries(sectionData).forEach(([section, data]) => {
        // Skip contact section - don't allow clicking on contact meshes
        if (section === 'contact') return;
        
        const intersects = raycaster.intersectObjects(data.interactiveMeshes);
        if (intersects.length > 0 && section !== currentSection) {
          navigateToSection(section as Section);
          setShowPrompt(false);
        }
      });
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    // Touch event listeners for mobile support
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrow keys, prevent default browser behavior
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        event.stopPropagation();
      } else {
        return; // Don't handle other keys
      }

      // Use the same order as the bottom navbar (left to right)
      const sections: Section[] = ['hero', 'about', 'projects', 'skills', 'contact'];
      // Use ref to get the latest currentSection value (avoids closure issues)
      const current = currentSectionRef.current;
      const currentIndex = sections.indexOf(current);
      
      // Safety check - if currentSection not found, don't navigate
      if (currentIndex === -1) {
        console.warn('Current section not found in navigation array:', current);
        return;
      }

      if (event.key === 'ArrowRight') {
        // Move to next section (right in navbar = next in array)
        const nextIndex = (currentIndex + 1) % sections.length;
        navigateToSection(sections[nextIndex]);
        setShowPrompt(false);
      } else if (event.key === 'ArrowLeft') {
        // Move to previous section (left in navbar = previous in array)
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        navigateToSection(sections[prevIndex]);
        setShowPrompt(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });

    // Smooth animation loop
    let animationId: number;
    const clock = new THREE.Clock();
    let frameCount = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      frameCount++;

      // Slow particle rotation for depth - make it more visible
      particles.rotation.y += 0.001;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;
      
      // Remove debug logging for production

      // Animate all section meshes continuously
      Object.values(sectionData).forEach((data, index) => {
        data.group.rotation.x = Math.sin(elapsedTime * 0.2 + index) * 0.3;
        data.group.rotation.y = elapsedTime * 0.1 * (index + 1) * 0.5;
        
        data.meshes.forEach((mesh, i) => {
          mesh.rotation.x += 0.002 * (index + 1);
          mesh.rotation.y += 0.003 * (index + 1);
          // Subtle breathing effect
          const scale = 1 + Math.sin(elapsedTime * 1.5 + i * 0.5) * 0.04;
          mesh.scale.setScalar(scale);
        });
      });

      // Camera movement based on mode
      if (sceneRef.current.navigationMode === 'exploration') {
        // Exploration mode: orbital camera with boundaries
        const center = new THREE.Vector3(0, 0, 0); // Center is now at origin
        const expCam = sceneRef.current.explorationCamera;
        
        // Enforce radius boundaries (min and max distance) - keep all planets and center in view
        const minRadius = 170;
        const maxRadius = 280;
        expCam.radius = Math.max(minRadius, Math.min(maxRadius, expCam.radius));
        
        // Enforce phi boundaries (vertical angle) - tighter range to keep planets in view
        expCam.phi = Math.max(0.4, Math.min(Math.PI - 0.4, expCam.phi));
        
        const x = center.x + expCam.radius * Math.sin(expCam.phi) * Math.cos(expCam.theta);
        const y = center.y + expCam.radius * Math.cos(expCam.phi);
        const z = center.z + expCam.radius * Math.sin(expCam.phi) * Math.sin(expCam.theta);
        
        const explorationTarget = new THREE.Vector3(x, y, z);
        camera.position.lerp(explorationTarget, 0.1);
        camera.lookAt(center);
        
        // Animate planets and labels (only if visible)
        if (sceneRef.current.planetMeshes) {
          sceneRef.current.planetMeshes.forEach((planet: THREE.Mesh, index: number) => {
            const label = sceneRef.current.planetLabels?.[index] as THREE.Sprite;
            
            if (planet.visible && planet.scale.x > 0.1) {
              planet.rotation.y += 0.01;
              planet.rotation.x += 0.005;
              // Subtle pulsing
              const pulse = 1 + Math.sin(elapsedTime * 2 + index) * 0.05;
              const baseScale = planet.userData.originalScale || 1;
              planet.scale.setScalar(baseScale * pulse);
              
              // Update label position to follow planet and face camera - ALWAYS VISIBLE
              if (label) {
                label.visible = true; // Always visible in exploration mode
                label.position.copy(planet.position);
                label.position.y += 50; // Keep label above planet (matching initial position)
                // Use fixed scale for labels so they're always readable, regardless of planet size
                label.scale.setScalar(1.0);
                // Make label always face camera
                label.lookAt(camera.position);
              }
            } else if (label) {
              // Even if planet is not fully visible, show label if planet exists
              label.visible = true; // Always show labels
              if (label.visible) {
                label.position.copy(planet.position);
                label.position.y += 50;
                label.scale.setScalar(1.0);
                label.lookAt(camera.position);
              }
            }
          });
        }
      } else {
        // Default mode: smooth camera movement with easing
        // Update all labels to face camera (including hero label)
        if (sceneRef.current.planetLabels) {
          sceneRef.current.planetLabels.forEach((label: THREE.Sprite) => {
            if (label && label.visible) {
              label.lookAt(camera.position);
            }
          });
        }
        
        const distance = camera.position.distanceTo(targetPosition);
        const speed = sceneRef.current.isNavigating ? 0.8 : 1.5;
        const smoothFactor = Math.min(deltaTime * speed, 0.1);
        
        camera.position.lerp(targetPosition, smoothFactor);

        // Dynamic camera tilt based on movement direction
        const velocity = new THREE.Vector3()
          .subVectors(targetPosition, camera.position)
          .multiplyScalar(0.01);
        
        // Subtle mouse parallax (reduced when navigating)
        const parallaxStrength = sceneRef.current.isNavigating ? 0.02 : 0.08;
        const targetRotationX = mouseY * parallaxStrength + velocity.y * 0.5;
        const targetRotationY = mouseX * parallaxStrength + velocity.x * 0.5;
        
        camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.05;
        camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.05;

        // Look at target with smooth offset
        const lookTarget = new THREE.Vector3(
          targetPosition.x + velocity.x * 10,
          targetPosition.y + velocity.y * 10,
          targetPosition.z - 30
        );
        
        const currentLookTarget = new THREE.Vector3();
        camera.getWorldDirection(currentLookTarget);
        currentLookTarget.multiplyScalar(30).add(camera.position);
        currentLookTarget.lerp(lookTarget, 0.05);
        
        camera.lookAt(currentLookTarget);
      }

      renderer.render(scene, camera);
    };

    // Start animation loop
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Only initialize once

  // Handle section changes from external triggers
  useEffect(() => {
    if (sceneRef.current && sceneRef.current.sectionData[currentSection]) {
      const sectionData = sceneRef.current.sectionData[currentSection];
      const newTarget = sectionData.position.clone();
      newTarget.z += 50;
      sceneRef.current.targetPosition.copy(newTarget);
    }
  }, [currentSection]);

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 w-full h-full touch-none" 
        style={{ 
          cursor: navigationMode === 'exploration' 
            ? (hoveredSection ? 'pointer' : 'grab') 
            : (hoveredSection ? 'pointer' : 'default'),
          zIndex: 0 
        }}
      />
      <NavigationHUD 
        currentSection={currentSection} 
        hoveredSection={hoveredSection}
        onNavigate={navigateToSection}
        navigationMode={navigationMode}
        onModeChange={(mode) => {
          isModeTransitioningRef.current = true;
          setNavigationMode(mode);
          // Allow mode transition to complete before allowing clicks
          setTimeout(() => {
            isModeTransitioningRef.current = false;
          }, 500);
        }}
      />
      {navigationMode === 'default' && (
        <ContentOverlay 
          currentSection={currentSection}
          isTransitioning={isTransitioning}
          onNavigate={navigateToSection}
        />
      )}
      {showPrompt && <InteractionPrompt onDismiss={() => setShowPrompt(false)} />}
    </>
  );
}
