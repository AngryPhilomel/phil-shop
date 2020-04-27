export default{
    install(Vue) {
        Vue.prototype.$modalAuth = function(){
            $('#modal').modal('show')
        }
    }
}