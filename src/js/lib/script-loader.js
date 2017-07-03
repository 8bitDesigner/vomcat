export default function loadScript (src, id = '') {
  return new Promise(resolve => {
    const script = Object.assign(document.createElement('script'), {id, src})
    script.addEventListener('load', () => resolve(window.FB))
    document.body.appendChild(script)
  })
}
