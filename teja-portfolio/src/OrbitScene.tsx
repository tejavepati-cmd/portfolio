import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function makeBag(): THREE.Group {
  const bag = new THREE.Group()
  const silhouette = new THREE.Shape()
  silhouette.moveTo(-0.76, 0.76)
  silhouette.quadraticCurveTo(-0.76, 0.92, -0.55, 0.92)
  silhouette.lineTo(0.55, 0.92)
  silhouette.quadraticCurveTo(0.76, 0.92, 0.76, 0.76)
  silhouette.lineTo(0.9, -0.64)
  silhouette.quadraticCurveTo(0.92, -0.83, 0.68, -0.83)
  silhouette.lineTo(-0.68, -0.83)
  silhouette.quadraticCurveTo(-0.92, -0.83, -0.9, -0.64)
  silhouette.closePath()

  const shellGeo = new THREE.ExtrudeGeometry(silhouette, { depth: 0.38, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: 0.07, bevelThickness: 0.07, curveSegments: 10 })
  shellGeo.translate(0, 0, -0.19)
  const shell = new THREE.Mesh(shellGeo, new THREE.MeshStandardMaterial({ color: 0xe86f4c, roughness: 0.34, metalness: 0.25, flatShading: false }))
  shell.castShadow = true
  bag.add(shell)

  const front = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.73, 0.045), new THREE.MeshStandardMaterial({ color: 0x9f4937, roughness: 0.42, metalness: 0.28 }))
  front.position.set(0, -0.24, 0.265)
  bag.add(front)
  const panel = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.54, 0.025), new THREE.MeshStandardMaterial({ color: 0x26302c, roughness: 0.28, metalness: 0.48, emissive: 0x13211c, emissiveIntensity: 0.3 }))
  panel.position.set(0, -0.24, 0.3)
  bag.add(panel)

  const sensor = new THREE.Group()
  sensor.position.set(0.38, 0.35, 0.34)
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.012, 8, 64), new THREE.MeshBasicMaterial({ color: 0xffba83, transparent: true, opacity: 0.8 }))
  sensor.add(halo)
  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.105, 24, 16), new THREE.MeshStandardMaterial({ color: 0xffc394, emissive: 0xff7048, emissiveIntensity: 1.3, roughness: 0.2, metalness: 0.32 }))
  lens.position.z = 0.014
  sensor.add(lens)
  const sensorLight = new THREE.PointLight(0xff8059, 1.8, 2.5)
  sensorLight.position.z = 0.3
  sensor.add(sensorLight)
  bag.add(sensor)

  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.13, 0.08), new THREE.MeshStandardMaterial({ color: 0xd3c7a4, roughness: 0.26, metalness: 0.8 }))
  buckle.position.set(0, -0.7, 0.31)
  bag.add(buckle)
  const handleCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.43, 0.83, 0), new THREE.Vector3(-0.48, 1.34, 0), new THREE.Vector3(0, 1.56, 0), new THREE.Vector3(0.48, 1.34, 0), new THREE.Vector3(0.43, 0.83, 0)])
  const handle = new THREE.Mesh(new THREE.TubeGeometry(handleCurve, 44, 0.055, 10, false), new THREE.MeshStandardMaterial({ color: 0xd56a49, roughness: 0.38, metalness: 0.27 }))
  bag.add(handle)

  const strapCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.65, 0.57, -0.06), new THREE.Vector3(-1.04, 0.22, -0.16), new THREE.Vector3(-1.12, -0.54, -0.12), new THREE.Vector3(-0.7, -0.78, 0)])
  bag.add(new THREE.Mesh(new THREE.TubeGeometry(strapCurve, 36, 0.065, 8, false), new THREE.MeshStandardMaterial({ color: 0x413d35, roughness: 0.62, metalness: 0.12 })))
  const strapCurve2 = strapCurve.clone()
  strapCurve2.points = strapCurve.points.map(p => new THREE.Vector3(-p.x, p.y, p.z))
  bag.add(new THREE.Mesh(new THREE.TubeGeometry(strapCurve2, 36, 0.065, 8, false), new THREE.MeshStandardMaterial({ color: 0x413d35, roughness: 0.62, metalness: 0.12 })))

  const seamMaterial = new THREE.MeshBasicMaterial({ color: 0xffc09a, transparent: true, opacity: 0.42 })
  const seam = new THREE.Mesh(new THREE.TorusGeometry(0.77, 0.008, 5, 100), seamMaterial)
  seam.scale.set(0.97, 0.94, 1)
  seam.position.set(0, -0.03, 0.263)
  bag.add(seam)
  return bag
}

export default function OrbitScene() {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = host.current
    if (!el) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0, 7.4)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    const sculpture = new THREE.Group()
    scene.add(sculpture)
    const bag = makeBag()
    sculpture.add(bag)
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffa27e, transparent: true, opacity: 0.54 })
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.009, 6, 160), orbitMaterial)
    orbit.rotation.set(0.95, 0.15, -0.22)
    sculpture.add(orbit)
    const orbit2 = new THREE.Mesh(new THREE.TorusGeometry(1.94, 0.005, 6, 160), new THREE.MeshBasicMaterial({ color: 0xa7b89c, transparent: true, opacity: 0.55 }))
    orbit2.rotation.set(1.43, -0.45, 0.34)
    sculpture.add(orbit2)
    const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffd1ae }))
    satellite.position.set(1.36, 0.89, 0.1)
    sculpture.add(satellite)

    scene.add(new THREE.HemisphereLight(0xdde6d8, 0x271813, 2.1))
    const key = new THREE.DirectionalLight(0xffd0ae, 3.2)
    key.position.set(-3, 4, 5)
    scene.add(key)
    const fill = new THREE.PointLight(0x91aa93, 4, 10)
    fill.position.set(3, -2, 3)
    scene.add(fill)

    const starsGeo = new THREE.BufferGeometry()
    const points = new Float32Array(240 * 3)
    for (let i = 0; i < points.length; i += 3) {
      points[i] = (Math.random() - 0.5) * 9
      points[i + 1] = (Math.random() - 0.5) * 8
      points[i + 2] = (Math.random() - 0.5) * 3
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(points, 3))
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xc8d0be, size: 0.015, transparent: true, opacity: 0.72 }))
    scene.add(stars)

    const pointer = new THREE.Vector2()
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    el.addEventListener('pointermove', onMove)
    const resize = () => {
      if (!el.clientWidth || !el.clientHeight) return
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(el)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    const render = () => {
      if (!reduceMotion) frame = requestAnimationFrame(render)
      if (!reduceMotion) {
        sculpture.rotation.y += 0.0015
        bag.rotation.y = THREE.MathUtils.lerp(bag.rotation.y, pointer.x * 0.18, 0.035)
        bag.rotation.x = THREE.MathUtils.lerp(bag.rotation.x, pointer.y * 0.11, 0.035)
        orbit.rotation.z += 0.0007
        stars.rotation.y -= 0.0001
      }
      renderer.render(scene, camera)
    }
    render()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      el.removeEventListener('pointermove', onMove)
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose()
          const material = object.material
          if (Array.isArray(material)) material.forEach(item => item.dispose())
          else material.dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="scene-wrap" aria-label="Interactive 3D smart reminder bag with illuminated sensor and orbital signal rings" role="img"><div className="scene" ref={host} /><div className="scene-label mono"><span className="live-dot"/> SMART SIGNAL <span>01 / 03</span></div></div>
}
