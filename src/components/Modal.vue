<template>
<div class="modal" id='modal' tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Войти в систему</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <form novalidate @submit.prevent="formAction">
        <div class="modal-body">        
            <div class="form-group">
                <label>Email</label>
                <input 
                    type="email" 
                    class="form-control" 
                    :class="{'is-invalid': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email), 'is-valid': ($v.email.required && $v.email.$dirty && $v.email.email)}"
                    v-model.trim="email">
                <div class="valid-feedback">
                    Почти готово!
                </div>
                <div 
                    class="invalid-feedback"
                    v-if="$v.email.$dirty && !$v.email.required"  
                >
                    Введите ваш Email!
                </div>
                <div 
                    class="invalid-feedback"
                    v-else-if="$v.email.$dirty && !$v.email.email"  
                >
                    Это не похоже на Email!
                </div>
            </div>
            <div class="form-group">
                <label>Пароль</label>
                <input 
                    type="password" 
                    class="form-control" 
                    v-model.trim="password"
                    :class="{'is-invalid': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength), 'is-valid': $v.password.required && $v.password.$dirty && $v.password.minLength}"
                    >
                <div 
                    class="invalid-feedback"
                    v-if="$v.password.$dirty && !$v.password.required"
                >
                    Введите ваш пароль!
                </div>
                <div 
                    class="invalid-feedback"
                    v-else-if="$v.password.$dirty && !$v.password.minLength"
                >
                    Минимальная длинна пароля: {{$v.password.$params.minLength.min}} символов, Вы ввели: {{password.length}} символов.
                </div>
                <div class="valid-feedback">
                    Почти готово!
                </div>          
            </div> 
            <!-- NAME-->
            <div class="form-group" v-if="newUser">
                <label>Имя</label>
                <input 
                    type="text" 
                    class="form-control" 
                    v-model.trim="name"
                    :disabled="!newUser"
                    >         
                    <small id="passwordHelpInline" class="text-muted">
                        Можно ввести позже.
                    </small>
            </div> 
            <!-- PHONE NUBER -->
            <div class="form-group" v-if="newUser">
                <label>Телефон</label>
                <input 
                    type="text" 
                    class="form-control" 
                    v-model.trim="number"
                    :disabled="!newUser"
                    >         
                    <small id="passwordHelpInline" class="text-muted">
                        Можно ввести позже.
                    </small>
                <!-- ADRESS -->
            </div> 
            <div class="form-group" v-if="newUser" >
                <label>Адрес доставки</label>
                <input 
                    type="text" 
                    class="form-control" 
                    v-model.trim="adress"
                    :disabled="!newUser"
                    >
                    <small id="passwordHelpInline" class="text-muted">
                        Можно ввести позже.
                    </small>
                         
            </div> 
            <!-- NEWUSER CHECKBOX -->
            <div class="form-group">
                <div class="custom-control custom-switch mt-1">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="newUser">
                    <label class="custom-control-label" for="customSwitch1">Новый пользователь</label>
                </div>
            </div>
        </div>
        <div class="modal-footer"> 
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
            <button type="submit" class="btn btn-primary">{{newUser ? 'Зарегистрироваться' : 'Войти'}}</button>
        </div>
      </form>
    </div>
  </div>
</div>

</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messageMixin from '../mixins/message.mixin'
export default {
    name:'modal',
    data: () => ({
        email: '',
        password: '',   
        number: '',
        adress: '',
        name: '',
        newUser: false,
    }),
    mixins:[messageMixin],
    validations: {
            email:{email, required},
            password:{required, minLength: minLength(6)},
        },
    methods: {
        async loginHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                this.$v.$touch()
                const formData = {
                email: this.email,
                password: this.password
                }
                try{
                    await this.$store.dispatch('login', formData)
                    await this.$store.dispatch('fetchInfo')
                    this.userInfo = this.$store.getters.info
                    $('#modal').modal('hide')
                    this.email=''
                    this.password=''
                    this.showMessage(`Вы ввошли в систему как ${this.userInfo.name}`, 2000)
                } catch(e) {
                    this.showMessage('Неверный логин и/или пароль', 2000)
                }

            },
        async registerHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            this.$v.$touch()
            const formData = {
                email: this.email,
                password: this.password,
                number: this.number,
                adress: this.adress,
                name: this.name,
            }
            try{
                await this.$store.dispatch('register', formData)
                await this.$store.dispatch('fetchInfo')
                this.userInfo = this.$store.getters.info
                $('#modal').modal('hide')
                this.email=''
                this.password=''
                this.number=''
                this.adress=''
                this.showMessage(`Вы ввошли в систему как ${this.userInfo.name}`, 2000)
            } catch(e) {
                this.showMessage('Неверный логин и/или пароль', 2000)
            }
        },
            
    },
    computed: {
                formAction() { 
                    return this.newUser ? this.registerHandler : this.loginHandler
                },
            },
}
</script>