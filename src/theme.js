import { writable } from 'svelte/store'
import { tweened } from 'svelte/motion'
import { derived } from 'svelte/store'
import { cubicOut } from 'svelte/easing'
const opts = {
  duration: 300,
  easing: cubicOut
}
export const highlightColor = tweened(100, opts)
export const bgColor = tweened(249, opts)
export const textColor = tweened(0, opts)
export const linkColor = tweened(148, opts)
export const selectedPreset = writable('custom')
export const themeStore = derived(
  [selectedPreset, highlightColor, bgColor, textColor, linkColor],
  arr => {
    return {
      selectedPreset,
      highlightColor,
      bgColor,
      textColor,
      linkColor,
      // yes there is room to derive colors but we dont yet
      toString: () => `
  --highlight-hue: ${arr[1]};
  --background-hue: ${arr[2]};
  --text-hue: ${arr[3]};
  --link-hue: ${arr[4]};
  `
    }
  }
)

// ## Tweening Theme Transitions with Svelte

// I previously wrote about ["CSS in JS" with Svelte](https://www.swyx.io/writing/svelte-zen-garden/). To smooth color change transitions, we can [tween them with `svelte/motion`](https://www.swyx.io/writing/svelte-zen-garden/) and use [`script context="module"`](https://svelte.dev/docs#script_context_module) to encapsulate both the CSS injection behavior and the store:

// ```html
// <script context="module">
//   import { tweened } from 'svelte/motion';
//   import { derived } from 'svelte/store';
//   import { cubicOut } from 'svelte/easing';
//   const opts = {
//     duration: 300,
//     easing: cubicOut
//   }
//   export const highlightColor = tweened(100, opts);
//   export const backgroundColor = tweened(249, opts);
//   export const textColor = tweened(185, opts);
//   export const linkColor = tweened(148, opts);
//   export const combinedTheme = derived([highlightColor, backgroundColor, textColor, linkColor], (arr) => {
//     // yes there is room to derive colors but we dont yet
//     return `
//   --highlight-color: ${arr[0]};
//   --background-color: ${arr[1]};
//   --text-color: ${arr[2]};
//   --link-color: ${arr[3]};
//   `
//   });
// </script>
// <script>
//   import { onMount, onDestroy } from 'svelte'
//   onMount(renderCSS)
//   onDestroy(() => {
//     var ss = document.getElementById("theme-stylesheet-id")
//     ss.innerHTML = '' // not actually sure if i need this
//   })
//   function renderCSS() {
//     var ss = document.getElementById("theme-stylesheet-id");
//     if (!ss) return // not rendered yet
//     ss.innerHTML = $combinedTheme
//   }
//   $: {
//     console.log({ $combinedTheme })
//     renderCSS()
//   }
// </script>
// <svelte:head>
//   <style id="unique-stylesheet-id"> </style>
// </svelte:head>
// ```

// // old system

// // need access to localstorage but cant call onmount with ssr
// // so write our own custom store!

// const defaultTheme = {
//   name: 'default',
//   bgColor: '#1d1f21',
//   textColor: '#eeeeee',
//   linkColor: '#2cb67d'
// }
// let _themeStore = defaultTheme
// let subscribers = new Set()
// let broadcast = () => subscribers.forEach(cb => cb(_themeStore))
// let saveToStorage = () => {
//   // if (_themeStore && typeof window !== undefined)
//   //   window.localStorage.setItem('themeStore', JSON.stringify(_themeStore))
// }
// export const themeStore = {
//   subscribe(cb) {
//     // if (subscribers.size < 1 && typeof window !== undefined) {
//     //   let temp = window.localStorage.getItem('themeStore')
//     //   _themeStore = temp ? JSON.parse(temp) : defaultTheme
//     // }
//     cb(_themeStore)
//     subscribers.add(cb)
//     return () => void subscribers.delete(cb)
//   },
//   set(newVal) {
//     _themeStore = newVal
//     broadcast()
//     saveToStorage()
//   },
//   update(updateFn) {
//     _themeStore = updateFn(_themeStore)
//     broadcast()
//     saveToStorage()
//   }
// }
