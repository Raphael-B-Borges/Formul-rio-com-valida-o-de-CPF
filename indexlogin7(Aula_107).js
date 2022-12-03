
class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario');
        this.eventos()
    }
    eventos(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e);
        });
    }
    handleSubmit(e){
        e.preventDefault();
       const validFields =  this.validFields();
       const validPasswords = this.validPasswords();

       if( validFields && validPasswords){
           this.formulario.submit();
           alert('enviado');
       }
    }

     validPasswords(){
        let valid = true;
        const password = this.formulario.querySelector('.senha');
        const repeatPassword = this.formulario.querySelector('.repetirsenha');

        if( password.value !== repeatPassword.value){
            valid = false;
            this.createError(password, `🛑  Campos "Senha" e "Repetir senha" precisam ser iguais.`);
            this.createError(repeatPassword, `🛑  Campos "Senha" e "Repetir senha" precisam ser iguais.`);
        }

        if( password.value.length < 6 || password.value.length > 12){
            valid = false;
            this.createError(password, '🛑  A senha só pode ter de 6 a 12 caracteres.')
        }
        return valid;
     }

    validFields(){
       let valid = true;

       for( let errorText of this.formulario.querySelectorAll('.error-text')){
        errorText.remove();
       }

       for ( let field of this.formulario.querySelectorAll('.validar')){
        const label = field.previousElementSibling.innerText;

          if( !field.value){
            this.createError(field, `🛑  Campo "${label}" não pode estar em branco.`);
            valid = false;
          }

          if( field.classList.contains('cpf')){
            if( !this.validandoCpf(field)) valid = false;
          }

          if( field.classList.contains('usuario')){
            if( !this.validandoUsuario(field)) valid = false;
          }
       }
       return valid;
    }

    validandoCpf(field){
        const cpf = new ValidaCPF(field.value);
        if (!cpf.valida()){
            this.createError(field, '🛑  CPF inválido .');
            return false;
        }
        return true;
    }

    validandoUsuario(field){
        const usuario = field.value;
        let valid = true;

        if( !usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.createError(field, '🛑   Apenas letras e/ou números.')
        }
       
        if( usuario.length < 3 || usuario.length > 18){
            this.createError(field, '🛑  Mínimo 3/máximo 18 caracteres.');
            valid = false;
        }
        return valid;
    }
    

    createError(field, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}
const valida = new ValidaFormulario();




   const senha = document.getElementById('senha');
   const olho1 = document.querySelector('.olho1');
   olho1.onclick = () =>{
    if( senha.type === 'password'){
        olho1.setAttribute('src', 'C:/Users/rapha/OneDrive/Documents/Email/Login7/Assets/images/eye.png');
        senha.type = 'text';
    }else{
        olho1.setAttribute('src', 'C:/Users/rapha/OneDrive/Documents/Email/Login7/Assets/images/eye1.png');
        senha.type = 'password';
        return;
    }
   }

    const repetirsenha = document.getElementById('repetirsenha');
    const olho2 = document.querySelector('.olho2');

         olho2.onclick = () =>{
    if( repetirsenha.type === 'password'){
         olho2.setAttribute('src', 'C:/Users/rapha/OneDrive/Documents/Email/Login7/Assets/images/eye.png');
         repetirsenha.type ='text';
   }else{
         olho2.setAttribute('src', 'C:/Users/rapha/OneDrive/Documents/Email/Login7/Assets/images/eye1.png');
         repetirsenha.type = 'password';
   }
   }



