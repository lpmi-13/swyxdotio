<script>
  import { themeStore, selectedPreset, highlightColor, bgColor, textColor, linkColor } from '../theme.js'
  import { fly } from 'svelte/transition';
  import { get } from 'svelte/store'
  // import { onMount, onDestroy } from 'svelte'
  // onMount(renderCSS)
  // onDestroy(() => {
  //   var ss = document.getElementById("theme-stylesheet-id")
  //   ss.innerHTML = '' // not actually sure if i need this
  // })
  // function renderCSS() {
  //   var ss = document.getElementById("theme-stylesheet-id");
  //   if (!ss) return // not rendered yet
  //   ss.innerHTML = $combinedTheme
  // }
  // $: {
  //   console.log({ $combinedTheme })
  //   renderCSS()
  // }
  let noop = () => { /* noop */ }
  // let breakloop = 0
  // let loopLimit = 1000000 // prevent against accidental infinite loop
  // $: {
  //   if (breakloop  < loopLimit) {
  //     if (selectedPreset !== 'custom') setPreset()
  //     console.log($themeStore)
  //     console.log({ breakloop })
  //   }
  // }
  // function setPreset() {
  //   let temp = presetThemes.find(theme => theme.name === selectedPreset)
  //   $themeStore = temp
  // }
  // const presetThemes = [
  //   {
  //     name: 'custom'
  //   },
  //   {
  //     name: 'light',
  //     // bgColor: "#d2bfb0",
  //     // textColor: "#2a2966",
  //     // linkColor: "#d4521d"
  //     highlightColor,
  //     bgColor,
  //     textColor,
  //     linkColor,
  //   },
  //   {
  //     name: 'default',
  //     // bgColor: '#1d1f21',
  //     // textColor: '#eeeeee',
  //     // linkColor: '#2cb67d'
  //   },
  // ]

  // local mirror of stores so it doesnt look so ugly as it tweens
  let _bgColor = get(bgColor)
  let _highlightColor = get(highlightColor)
  let _linkColor = get(linkColor)
  let _textColor = get(textColor)
  $: {
    // no idea if theres a better way to do this
    if (_bgColor && _bgColor !== get(bgColor)) bgColor.set(_bgColor)
    if (_highlightColor && _highlightColor !== get(highlightColor)) highlightColor.set(_highlightColor)
    if (_linkColor && _linkColor !== get(linkColor)) linkColor.set(_linkColor)
    if (_textColor && _textColor !== get(textColor)) textColor.set(_textColor)
  }
</script>
<form id="themeEditor" on:click|stopPropagation={noop} transition:fly>
  <div class="PresetContainer">
    Preset:
    <select class="select-css" bind:value={$selectedPreset} name="themeSelector" id="themeSelector">
      <option>custom</option>
      <option>light</option>
      <option>default</option>
    </select>
  </div>
  {#if $selectedPreset === 'custom'}
  <div class="customColorSelectorContainer">
    <label> Background Hue:
      <input type='range' bind:value={_bgColor} min="0" max="360">
    </label>
    <label> Text Hue:
      <input type='range' bind:value={_textColor} min="0" max="360">
    </label>
    <label> Link Hue:
      <input type='range' bind:value={_linkColor} min="0" max="360">
    </label>
    <label> Highlight Hue:
      <input type='range' bind:value={_highlightColor} min="0" max="360">
    </label>
  </div>
  {/if}
  <span>⚠️ This is a WIP feature! Ideas welcome
  </span>
</form>
