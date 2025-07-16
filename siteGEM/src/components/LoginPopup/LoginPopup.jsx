import { useState, useEffect } from 'react';
import Styles from './LoginPopup.module.css';
import logo from '../../assets/logoGemColored.png';

const LoginPopup = ({ isOpen, onClose }) => {
  const year = new Date().getFullYear();
  const [isClosing, setIsClosing] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const validateLogin = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Usuário é obrigatório.';
    if (!password.trim()) newErrors.password = 'Senha é obrigatória.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`Bem-vindo, ${username}!`);
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose(); // notifica o componente pai
      setUsername('');
      setPassword('');
      setErrors({});
    }, 300); // duração da animação
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`${Styles.modalOverlay} ${isClosing ? Styles.fadeOut : ''}`}>
      <div className={`${Styles.loginCard} ${isClosing ? Styles.cardClosing : ''}`}>
        <button className={Styles.closeButton} onClick={handleClose}>×</button>
        <img src={logo} alt="Logo GEM" className={Styles.loginLogo} />
        <div className={Styles.loginFields}>
          <label>Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
          />
          {errors.username && <span className={Styles.error}>{errors.username}</span>}

          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
          {errors.password && <span className={Styles.error}>{errors.password}</span>}

          <button className={Styles.enterButton} onClick={validateLogin}>Entrar</button>

          <p>Copyright &copy; {year} Grupo Economia do Mar. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
