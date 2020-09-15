<template>
    <div>
        <p :key="l" v-for="l in list">{{ l }}</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list: []
        }
    },
    mounted(){
        for (let index = 0; index < 100; index++) {
            this.list.push(index)
        }
    }
}
</script>