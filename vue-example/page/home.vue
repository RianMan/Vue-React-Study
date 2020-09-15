<template>
    <div>
        <Datepick v-model='time' />
    </div>
</template>

<script>
import Datepick from '../components/datepick.vue';
export default {
    mounted(){
        for (let index = 0; index < 100; index++) {
            this.list.push(index)
        }
    },
    methods: {
    },
    data(){
        return {
            content: 'home',
            list: [],
            // 1597462109000
            time: new Date(),
        }
    },
    components:{
        Datepick
    }
}
</script>