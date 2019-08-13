//观察者
//发布订阅
class Dep{
    
}

//观察者
class Watcher{

}


//数据拦截
class Observer{
    constructor(data){
        this.data = data;
        this.observe(this.data);
    }

    // 监控数据
    observe(data){
        if(data && typeof data === 'object'){
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    this.dataIntercept(key,data[key]);
                }
            }
        }
    }
    
    // 数据劫持
    dataIntercept(key,oldVal){
        this.observe(oldVal)
        Object.defineProperty(this.data, key,{
            get: () => {
                return oldVal
            },
            set: (newVal) => {
                oldVal = newVal
            }
        });
    }

}

class Compiler{
    constructor(el,data,vm){
        this.$el = el;
        this.data = data;
        this.vm = vm;
        let node = this.isElementNode(this.$el) ? this.$el : document.querySelector(options.el)
        // 避免重绘回流，一次性将节点全部加载到文档碎片中去
        let fragment = this.nodeToFragment(node);
        // 编译
        this.compile(fragment)
        // 添加到文档中去
        node.appendChild(fragment)
    }

    // 判断用户传进来的是不是node节点
    isElementNode(el){
        return el.nodeType === 1;
    }

    // 将node节点转移到文档碎片
    nodeToFragment(node){
        let fragment = document.createDocumentFragment();
        let firstChild = null;
        // 利用childNodes进行for循环也可以达到效果，这里利用这个更简便
        while(firstChild = node.firstChild){
            fragment.appendChild(firstChild)
        }
        return fragment;
    }

    // 编译
    compile(fragment){
        [...fragment.childNodes].forEach((e)=>{
            if(e.nodeType === 1){
                // 因为里面还有子元素，所以还需要在遍历一遍
                this.compile(e);
                [...e.attributes].forEach((attr,index)=>{
                    // arrt是个对象
                    let { name ,value } = attr;
                    name.startsWith('v-') && this.handleElementNode(name,value,e);
                })
            }
            if(e.nodeType === 3){
                let reg = /\{\{.+?\}\}/;
                reg.test(e.textContent) && this.handleTextNode(e.textContent,e);
            }
        })
    }

    // 转换指令元素类
    handleElementNode(attr,val,node){
        let value = this.getVal(val);
        let [,dir] = attr.split('-');
        CompileUtil[dir](node,value)
    }

    // 转换差值表达式 文本类
    handleTextNode(val,node){
        let reg = /\{\{(.+?)\}\}/;
        let newVal = val.replace(reg, (...arg) => {
            return this.getVal(arg[1])
        });
        console.log(node)
        node.textContent = newVal;
    }

    // 根据传入的表达式获取data的数据
    getVal(expr){
        let data = this.data;
        return expr.split('.').reduce((pre,cur)=>{
            return pre[cur]
        },data)
    }
}

CompileUtil = {
    model(node,val){
        node.value = val;
    },
    html(){},
    text(){},
}

class Vue{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data;
        if(this.$el){
            new Observer(this.$data)
            console.log(this.$data)
            new Compiler(this.$el,this.$data,this)
        }
    }
   
}