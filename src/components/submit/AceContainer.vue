<template>
  <div class="ace-container" >
    <div id="code">
      <div id="title-code" class="head-section">Source Code</div>
      <!-- <input id="launch-button" class="head-section" type="submit" value="Launch" /> -->
      <div id="text-code" >
        <editor v-model="code" @init="editorInit" lang="python" theme="chrome" ref="ace"></editor>
      </div>
    </div>
  </div>
</template>

<script>
import ResizeMixin from '@/utils/resolutionUtils/resizeHandler'
export default {
  name: 'AceContainer',
  mixins: [ResizeMixin],
  components: {
    editor: require('vue2-ace-editor')
  },
  data () {
    return {
      code: 'print("Hello world!")'
    }
  },

  methods: {
    editorInit: function () {
      require('brace/ext/language_tools')
      require('brace/mode/python')
      require('brace/theme/chrome')
    }
  }
}
</script>

<style lang="scss" scoped>
.ace-container {
  height: auto;
  margin: 0%;
  width: 100%;
  // display: flex;
  #code {
    height: auto;
    #title-code{
        margin-bottom: 0.5%;
    }
    #text-code {
      height: 60vh;
      width: 90vw;
    }
  }
}
</style>
