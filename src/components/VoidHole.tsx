"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader
const fragmentShader = `
  precision mediump float;

  uniform vec2 iResolution;
  uniform float iTime;
  uniform float iSize;
  uniform vec2 position;

#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define HALF_PI 1.57079632679

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }

float fbm3d(vec3 x, const in int it) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);

    for (int i = 0; i < 32; ++i) {
        if(i<it) {
            v += a * snoise(x);
            x = x * 2.0 + shift;
            a *= 0.5;
        }
    }
    return v;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float t = iTime * .2;
    
     // Define offsets for x and y positions
    float offsetX = position.x * iResolution.x;
    float offsetY = position.y * iResolution.y;
    
    vec2 uv = (fragCoord - 0.5 * iResolution.xy + vec2(offsetX, offsetY)) / iResolution.y;
    vec2 st = vec2(
        length( uv ) / (iSize),
        atan( uv.y, uv.x )
    );
    
    st.y += st.x * 1.1;
        
    float x = fbm3d(
        vec3(
            sin( st.y ),
            cos( st.y ),
            pow( st.x, .3 ) + t * .1
        ),
        3
    );
	float y = fbm3d(
        vec3(
            cos( 1. - st.y ),
            sin( 1. - st.y ),
            pow( st.x, .5 ) + t * .1
        ),
        4
    );
    
    float r = fbm3d(
        vec3(
            x,
            y,
            st.x + t * .3
        ),
        5
    );
    r = fbm3d(
        vec3(
            r - x,
            r - y,
            r + t * .3
        ),
        6
    );
    
    float c = ( r + st.x * 5. ) / 6.;
    
    fragColor = vec4(
        smoothstep( .3, .4, c ),
        smoothstep( .4, .55, c ),
        smoothstep( .2, .55, c ),
        1.0
    );
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const useShader = (
  shader: { vertex: string; fragment: string },
  containerRef: React.RefObject<HTMLDivElement | null>,
  speed: number,
  iSize: number,
  position: { x: number; y: number }
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const uniforms = {
      iResolution: { value: new THREE.Vector2(width, height) },
      iTime: { value: 0 },
      iSize: { value: iSize },
      position: { value: new THREE.Vector2(position.x, position.y) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
      transparent: true,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(plane, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.iTime.value += clock.getDelta() * speed;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      renderer.setSize(newWidth, newHeight);
      uniforms.iResolution.value.set(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [shader, speed, iSize, position]);
};

export default function VoidHole(props: {
  speed?: number;
  iSize?: number;
  position?: { x: number; y: number };
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const speed = props.speed ?? 1;
  const iSize = props.iSize ?? 1.5;
  const position = props.position ?? { x: -0.5, y: -0.5 };

  useShader(
    { vertex: vertexShader, fragment: fragmentShader },
    containerRef,
    speed,
    iSize,
    position
  );

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative", ...props.style }}
    />
  );
}
