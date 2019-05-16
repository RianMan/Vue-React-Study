### redux-react

------

1. Provider:
        
    *  当我们之前去写每个组件的时候，肯定要引入store，那这样就很麻烦，因为你不可能每个组件都挨个去引入，所以我们就想到可以在我们的app应用中的最外层加上一个组件，且这个组件负责去引入这个store，然后将它挂载到context的上下文对象上，那这样我们每个组件就可以通过上下文去那这个整个store，
    ```
        class Provider extends Component{

            static childContextTypes = {
                store: ProtoTypes.object.isRequired,
            }

            getChildContext(){
                return {
                    store: this.props.store,
                }
            }

            render(){
                return this.props.children
            }
        }

        export default Provider;
    ```
    ----
    >  childContextTypes就是我们把要传递的参数放到这个对象上，然后通过getChildContext将这个状态返回
    
    * 在子组件如何去拿这个store？

        ```
            static contextTypes = {
                store: PropTypes.object,
            }
        
            constructor(props,context){
                super(props)
                this.store = context.store;
            }
        ```

        这样就很轻动的拿到this.store了，然后就可以进行我们的逻辑操作了；

2. connect

    * 为什么有这个connect组件？

        - 因为在每个组件中有很多重复的代码，例如在组件挂载的时候监听函数，在组件卸载的时候取消事件监听，那这些逻辑都是一样的，所以这些都可以封装除去，那好，一定想到的是高阶组件去做这个工作了
    
    * 怎么去把对应的state和action传给我们的组件

        - 因为不同的组件需要的state不一样，而且修改state的action也不一样，那我们肯定想到通过传入参数去解决这个问题？但是我们怎么传参这个问题比较复杂，

        - 我们可以将传入的state，挂载到connect这个原始组件的state上去，方法通过bindActionCreator去产生newAction对象，然后把这个两个作为props传给我们包裹后的组件，那这样包裹后的组件就可以通过this.props拿到状态和修改状态的方法了

        ```
            constructor(props,context){
                super(props)
                this.store = context.store;

                +++ this.state = mapToState(this.store.getState())
            }
            ...
            render(){
                let actionsObj = {};
                +++ actionsObj  = bindActionCreator(mapDispatchToProps, this.store.dispatch)
                return <WarpedComponent {... this.state} {...actionsObj} />
            }
        ```

    * 那我们在我们的组件里面怎么传参？

        ```
            import connect from '../redux-react/connect';
            import actions from '../store/counter-actions';
            // 从我们的counter的action里面引入actions
            // 因为我们所有的state已经挂载到store上去了，
            // 所以通过state.counter就可以拿到我们的参数了
            @connect(state=> (state.counter),actions)
        ```
    
    
