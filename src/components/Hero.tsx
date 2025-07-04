import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
    if (!gl) {
      console.warn('WebGL not supported, falling back to static background');
      return;
    }

    let animationId: number;
    let isDestroyed = false;

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader with procedural noise and flowing animation
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_dark; // 0.0 = light, 1.0 = dark
      varying vec2 v_uv;
      
      // Improved noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      // Fractal Brownian Motion
      float fbm(vec2 p, float time) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for(int i = 0; i < 6; i++) {
          value += amplitude * snoise(p * frequency + time * 0.1);
          amplitude *= 0.5;
          frequency *= 2.0;
          p = mat2(1.6, 1.2, -1.2, 1.6) * p;
        }
        
        return value;
      }
      
      // Domain warping for more organic flow
      vec2 domainWarp(vec2 p, float time) {
        vec2 q = vec2(
          fbm(p + vec2(0.0, 0.0), time),
          fbm(p + vec2(5.2, 1.3), time)
        );
        
        vec2 r = vec2(
          fbm(p + 4.0 * q + vec2(1.7, 9.2), time),
          fbm(p + 4.0 * q + vec2(8.3, 2.8), time)
        );
        
        return fbm(p + 4.0 * r, time) * vec2(1.0, 1.0);
      }
      
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float time = u_time * 0.15;
        
        // Create flowing, organic patterns
        vec2 warp = domainWarp(uv * 2.0, time);
        float noise1 = fbm(uv * 3.0 + warp, time);
        float noise2 = fbm(uv * 1.5 + warp * 0.5, time + 100.0);
        
        // Layer multiple noise patterns for depth
        float pattern1 = sin(noise1 * 3.14159 + time) * 0.5 + 0.5;
        float pattern2 = sin(noise2 * 2.0 + time * 0.7) * 0.5 + 0.5;
        
        // Create flowing gradients
        float flow = fbm(uv + vec2(sin(time * 0.3), cos(time * 0.2)), time);
        
        // Light-mode Apple-style palette
        vec3 l1 = vec3(0.96, 0.96, 0.97); // Apple background (#f5f5f7)
        vec3 l2 = vec3(0.93, 0.93, 0.95); // Slightly darker light grey
        vec3 l3 = vec3(0.35, 0.78, 0.98); // Accent blue (#5ac8fa)

        // Dark-mode Apple-style neutral palette
        vec3 d1 = vec3(0.11, 0.11, 0.12); // Near-black (#1d1d1f)
        vec3 d2 = vec3(0.17, 0.17, 0.18); // Dark grey (#2c2c2e)
        vec3 d3 = vec3(0.0, 0.52, 1.0);   // Accent blue (#0a84ff)

        vec3 color1 = mix(l1, d1, u_dark);
        vec3 color2 = mix(l2, d2, u_dark);
        vec3 color3 = mix(l3, d3, u_dark);
        
        vec3 finalColor = mix(
          mix(color3, color1, pattern1),
          color2,
          pattern2 * 0.7
        );
        
        // Add flowing highlights
        float highlight = smoothstep(0.3, 0.7, flow + 0.3);
        // Use accent blue for highlights in both themes but modulated by u_dark
        vec3 accent = mix(vec3(0.35, 0.78, 0.98), vec3(0.0, 0.52, 1.0), u_dark);
        finalColor += accent * highlight * 0.25;
        
        // Subtle vignette for depth
        float vignette = 1.0 - length(uv * 0.5);
        vignette = smoothstep(0.3, 1.0, vignette);
        
        finalColor *= vignette;
        
        // Fade edges for seamless blending
        float edgeFade = smoothstep(0.0, 0.3, min(v_uv.x, min(v_uv.y, min(1.0 - v_uv.x, 1.0 - v_uv.y))));
        
        gl_FragColor = vec4(finalColor * 0.6 * edgeFade, 0.8 * edgeFade);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
      const program = gl.createProgram();
      if (!program) return null;
      
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      
      return program;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;
    
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Set up geometry
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const darkModeLocation = gl.getUniformLocation(program, 'u_dark');

    function resize() {
      if (!canvas || !gl) return;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    function render(time: number) {
      if (isDestroyed || !canvas || !gl || !program || !positionBuffer) return;
      resize();
      
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.useProgram(program);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      if (darkModeLocation) {
        gl.uniform1f(darkModeLocation, isDark ? 1.0 : 0.0);
      }
      
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      if (!isDestroyed) {
        animationId = requestAnimationFrame(render);
      }
    }

    resize();
    animationId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!isDestroyed) resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isDestroyed = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      
      // Cleanup WebGL resources in proper order
      if (gl) {
        gl.useProgram(null);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (program) gl.deleteProgram(program);
        if (vertexShader) gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);
      }
    };
  }, [isDark]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-apple-bg dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 3D Procedural Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Fallback overlay visible only in dark mode */}
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-gray-900 opacity-50" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-apple-blue p-1 shadow-2xl"
          >
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-4xl font-bold text-white">
              AM
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 text-apple-text dark:text-white"
        >
          Antash Mishra
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-apple-gray dark:text-gray-200 mb-4"
        >
          Full-Stack Developer & 3D Graphics Enthusiast
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-apple-gray dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          I'm a developer who loves coding. Powered by caffeine & curiosity.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-apple-text rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-200 dark:text-gray-900"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-apple-text transition-colors duration-300 dark:border-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-6 mb-12"
        >
          {[
            { icon: Github, href: 'https://github.com/antash-mishra', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/antash-mishra', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:mishraantash34@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Animated scroll indicator pinned to very bottom, beneath social icons */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-0"
      >
        <ChevronDown size={28} className="text-gray-400 dark:text-gray-500" />
      </motion.div>
    </section>
  );
};

export default Hero;