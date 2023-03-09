import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from "react-redux";
import { getLibrary } from '../utils/web3React'
import { LanguageProvider } from './Localization'
import ModalProvider from './ModalContext/Provider';
import store from "../state";

const Providers: React.FC<any> = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <LanguageProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
        </LanguageProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers