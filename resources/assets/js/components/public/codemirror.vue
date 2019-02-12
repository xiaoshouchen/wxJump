<template>
    <codemirror v-model="code" :options="cmOption" @changes="change"></codemirror>
</template>

<script>
    import { codemirror } from 'vue-codemirror'

    // require styles
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/monokai.css'
    import 'codemirror/mode/javascript/javascript'
    // require more codemirror resource...

    // component
    export default {
        components: {
            codemirror
        },
        data() {
            return {
                code: '',
                cmOption: {
                    lineNumbers:true,
                    mode: "application/ld+json",
                    theme: "monokai",
                }
            }
        },
        methods:{
            change(){
                this.$emit('change',this.code)
            }
        },


    }
</script>

<style lang="scss">
    main {
        position: relative;
    }
    .CodeMirror-linenumber,pre.CodeMirror-line{
        line-height: 14px;
    }
</style>