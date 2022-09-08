import { Check } from 'phosphor-react';
import { FormEvent, MouseEvent, useRef, useState } from 'react'
import Logo from './assets/logo.svg'
import BackgroundImg from './assets/background.jpg'
import BackgroundImgLarge from './assets/background_large.jpg'

export function Login(){
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [ validationUser, setValidationUser ] = useState(false);
  const [ validationPassword, setValidationPassword ] = useState(false);

  const [passwordVisible , setPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [remember, setRemember] = useState(true);

  function handleButtonSubmit(event: FormEvent){
    event.preventDefault();
    setValidationUser(true)
    setValidationPassword(true)
  }

  function validationInput(element: string){
    if(element === 'user'){
      setValidationUser(true)
    }else{
      setValidationPassword(true)
    }
  }

  function handlePasswordVisible(e: MouseEvent<HTMLButtonElement>){
    e.preventDefault()
    setPasswordVisible(!passwordVisible)
    inputRef.current?.focus();
  }

  function handleRememberMessage(e: MouseEvent<HTMLInputElement>){
    const target = e.target as HTMLInputElement;
    setRemember(target.checked)
  }

  return(
    <div className='bg-black relative'>

      <div className='min-h-[100vh] h-full w-full bg-cover bg-[#000] absolute overflow-hidden'>
        <img src={BackgroundImg} srcSet={`${BackgroundImg} 1500w, ${BackgroundImgLarge} 1800w`} className='w-screen min-w-max min-h-full opacity-[0.5] hidden md:block' />
      </div>

      <header className='absolute w-full h-[90px] top-0 left-0 bg-gradient-to-b from-[#00000080] to-transparent'>
        <a href="#" className='flex items-center h-[90px]'>
          <img src={Logo} alt="Logo vermelho netflix" className='ml-[3%]' />
        </a>
      </header>

      <div className='text-white min-w-full pt-[90px]'>
        <div className='md:max-w-[450px] md:min-h-[660px] flex flex-col m-auto rounded-md px-[5%] md:px-[68px] pt-[20px] md:pt-[60px] bg-[rgba(0,0,0,.75)] opacity-[0.99]'>
          <h1 className='text-[32px] leading-10 font-bold mb-7'>Entrar</h1>
          <form onSubmit={handleButtonSubmit}>
            <label className={`${validationUser && !user ? 'border-b-[#e87c03]' : 'border-b-transparent'} block relative border-b-2 rounded`}>
              <input 
                type="text" 
                className='min-w-full border-none outline-none peer bg-[#333] focus:bg-[#454545]  rounded h-[50px] px-5 pt-4'
                onChange={(e) => setUser(e.target.value)}
                onBlur={() => validationInput('user')}
                value={user}
                id='userLogin'
              />
              <label 
                htmlFor='userLogin' 
                className={`${user ? 'text-[11px] top-[12px] translate-0' : 'top-[50%]'} absolute peer-focus:text-[11px] transition-all left-[20px] peer-focus:top-[12px] translate-y-[-50%] peer-focus:translate-0 text-md text-[#8c8c8c]`}
              >
                Email ou número de telefone
              </label>
            </label>

            {validationUser && !user && <strong className='text-[#e87c03] text-[13px] py-[6px] px-[3px] block font-medium'>Informe um email ou número de telefone válido.</strong> }

            <label className={`${validationPassword && !password ? 'border-b-[#e87c03]' : 'border-b-transparent'} 
            ${validationUser && !user ? 'mt-2' : 'mt-4'}
              block relative border-b-2 rounded group`}>
              <input 
                type={passwordVisible ? 'text' : 'password'} 
                className='min-w-full border-none outline-none peer bg-[#333] group-focus-within:bg-[#454545] rounded h-[50px] px-5 pt-4'
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validationInput('password')}
                ref={inputRef}
                value={password}
                id='passwordUser'
              />
              <label 
                htmlFor='passwordUser' 
                className={`${password ? 'text-[11px] top-[12px] translate-0' : 'top-[50%]'} absolute peer-focus:text-[11px] transition-all left-[20px]  peer-focus:top-[12px] translate-y-[-50%] peer-focus:translate-0 text-md text-[#8c8c8c]`}
              >
                Senha
              </label>
              <button 
                onClick={handlePasswordVisible}
                className='cursor-pointer text-transparent pointer-events-none group-focus-within:pointer-events-auto  group-focus-within:text-[#8c8c8c] text-[14px] absolute right-3 top-[50%] translate-y-[-50%]'
              >
                {passwordVisible ? 'OCULTAR' : 'MOSTRAR'}
              </button>
            </label>

            {validationPassword && !password && <strong className='text-[#e87c03] text-[13px] py-[6px] px-[3px] block font-medium'>A senha deve ter entre 4 e 60 caracteres.</strong> }

            <button 
              type='submit'  
              className='bg-[#e50914] mt-10 min-w-full font-bold p-4 rounded leading-none'
            >
              Entrar
            </button>

            <div className='flex mt-3 justify-between text-[#b3b3b3] font-medium text-[13px]'>
              <span className='flex'>
                <label 
                  htmlFor='remember'
                  className='mr-1 bg-white block h-[16px] w-[16px] bg-[#737373] hover:bg-[#fff] focus:bg-[#fff] rounded-sm cursor-pointer p-[1px]'
                > 
                  <input type="checkbox" id='remember' onClick={handleRememberMessage} className='hidden'/>
                  {remember && <Check size={14} color="#000000" weight="bold" />}
                </label>
              
                Lembre-se de mim
              </span>

              <a href="#" className='hover:underline'>Precisa de ajuda?</a>
            </div>
          </form>
          
          <div className='mt-[6rem] text-[#737373] font-medium text-[16px]'>
              <span>Novo por aqui?</span>
              <a href="#" className='text-white ml-1 hover:underline'>Assine agora.</a>
          </div>

          <p className='text-[#8c8c8c] font-medium text-[13px] leading-4 my-[13px]'>
            Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô. 
            <a href="#" className='hover:underline font-bold text-[#0071eb]'>Saiba mais.</a>
          </p>
        </div>
      </div>

      <footer className='bg-[#000000bf] relative w-full mt-[6rem] min-h-[17rem] text-white border-t border-[#737373] md:border-transparent px-7'>
          <div className='md:max-w-[1000px] text-[#737373] m-auto py-[30px]'>
            <p className='text-[1rem] mb-[30px]'>Dúvidas? Ligue <span className='cursor-pointer hover:underline'>0800 591 8942</span></p>

            <ul className='text-[13px]'>
              <li className='w-6/12 md:w-3/12 inline-block p-0 pr-3 mb-4 hover:underline'>Perguntas frequentes</li>
              <li className='w-6/12 md:w-3/12 inline-block p-0 pr-3 mb-4 hover:underline'>Central de Ajuda</li>
              <li className='w-6/12 md:w-3/12 inline-block p-0 pr-3 mb-4 hover:underline'>Termos de Uso</li>
              <li className='w-6/12 md:w-3/12 inline-block p-0 pr-3 mb-4 hover:underline'>Privacidade</li>
              <li className='w-6/12 md:w-3/12 inline-block p-0 pr-3 mb-4 hover:underline'>Preferências de cookies</li>
              <li className='w-6/12 md:w-3/12 inline-block p-0 pr-3 mb-4 hover:underline'>Informações corporativas</li>
            </ul>
          </div>
      </footer>
    </div>
  )
}