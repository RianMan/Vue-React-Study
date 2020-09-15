<template>
    <div id="date_container" v-dateClick>
        <input type="text" v-model="getTimeStr">
        <div class="date_body" v-show="isShowDate">
            <div class="nav">
                <div class="icon" @click="handleClickPage('pre_year')"> &lt;&lt; </div>
                <div class="icon" @click="handleClickPage('pre_month')" style="margin-left: 10px" > &lt; </div>
                <div class='title'> {{getTitle}} </div>
                <div  class="icon" @click="handleClickPage('next_month')" > &gt; </div>
                <div class="icon" @click="handleClickPage('next_year')" style="margin-left: 10px"> &gt;&gt; </div>
            </div>
            <div class="content">
                <div class="col" v-for="i in 6" :key="i">
                    <span
                        @click="handleSelectTime(getDateObj(i,j).date)"
                        class="cell" 
                        v-for="j in 7" :key=" '_' + j"
                        :class="[
                            getDateObj(i,j).isCurrentMonth ? 'isCurrentMonth' : '',
                            getDateObj(i,j).isCurrentDay ? 'isCurrentDay' : '',
                        ]"
                    >
                        {{getDateObj(i,j).day}}
                    </span>
                </div>
            </div>
            <div class="footer">
                今天
            </div>
        </div>
    </div>
</template>
<script>
import * as utils from '../utils/index.js';
import Vue from 'vue';

Vue.directive('dateClick',{
    // 指令的定义
    bind: function (el,binding,vn) {
        document.addEventListener('click',(e)=>{
            if(el.contains(e.target)){
                vn.context.showDateContainer()
            }else{
                 vn.context.hideDateContainer()
            }
        })
    }
})


export default {
    props:{
        val:{
            default: new Date(),
            type: Date,
        }
    },
    model: {
        prop: 'val',
        event: 'changeDate'
    },
    data(){
        return {
            isShowDate: false,
            renderDateList: [],
            renderVal: this.val,
        }
    },
    created(){
        this.setRenderDateList();
    },
    methods:{
        showDateContainer(){
            this.isShowDate = true;
        },
        hideDateContainer(){
            this.isShowDate = false;
        },
        getDateObj(i,j){
            return this.renderDateList[ (i-1) * 7 + (j -1)]
        },
        handleSelectTime(val){
            this.renderVal = val;
            this.$emit('changeDate', val);
            this.isShowDate = false;
        },
        handleClickPage(action){
            // let { year, month, day} = utils.getFullTime(this.val);
            if(action === 'pre_year'){
                let t = this.renderVal.getTime() - (365 * 24 * 60 * 60 * 1000);
                this.renderVal = new Date(t)
            }
            if(action === 'next_year'){
                let t = this.renderVal.getTime() + (365 * 24 * 60 * 60 * 1000);
                this.renderVal = new Date(t)
            }
        },
        setRenderDateList(){
            let {week ,monthFirstDay} = utils.getFirstDayWeek(this.renderVal);
            let monthFirstDayTimeStamp  = monthFirstDay.getTime();
            this.renderDateList = [];
            week = week === 0 ? 7 : week;
            for (let index = 0; index < 42; index++) {
                let date = monthFirstDayTimeStamp + utils.transformTimeStamp(index - week + 1);
                let {year, month ,day} = utils.getFullTime(new Date(date));
                let {year:y, month:m ,day:d} = utils.getFullTime(this.val);
                this.renderDateList.push({
                    date: new Date(date),
                    day,
                    isCurrentMonth: month === m,
                    isCurrentDay: year === y && month === m && day === d,
                });
            }
        }
    },
    watch:{
        renderVal: function(newVal,oldVal) {
            this.setRenderDateList();
        }
    },
    computed:{
        getTimeStr(){
            let { year, month, day} = utils.getFullTime(this.val);
            return `${year}-${month}-${day}`
        },
        getTitle(){
            let { year, month, day} = utils.getFullTime(this.renderVal);
            return `${year}年${month}月`
        }
    }
}
</script>

<style lang="less" scoped>
#date_container{
    position: relative;
    input{ 
        box-sizing: border-box;
    }
    .col{
        height: 30px;
        margin: 2px 0;
    }
    .cell{
        display: inline-block;
        padding: 3px;
        width: 16px;
          border: 1px solid transparent;
        text-align: center;
        color: #ccc;
        margin: 0 4px;
    }
    .cell:hover{
        color: #000;
        background-color: #eee;
    }
    .isCurrentMonth{
        color: #444;
        font-weight: 500;
    }
    .isCurrentDay{
        border: 1px solid #1890ff;
        border-radius: 2px;
    }
    .date_body{
        display: inline-flex;
        flex-direction: column;
        box-shadow: 1px 1px 1px 1px #ccc;
        position:absolute;
        top: 30px;
        left:0;
        cursor: pointer;
    }
    .content{
        padding: 5px;
        font-size: 14px;
    }
    .nav{
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
        height: 35px;
        font-weight: 500;
        padding: 5px;
        font-size:14px;
        .title{
            flex: 1;
        }
        .icon{
            color: #ccc;
            font-size: 12px;
            font-weight:bold;
        }
    }
    .nav,.footer{
        text-align: center;
    }
    .footer{
        border-top: 1px solid #f0f0f0;
        padding: 5px;
        color: #1890ff;
        font-size:14px;
    }
}

</style>