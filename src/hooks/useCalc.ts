import React, {useState} from 'react';
import useEventListener from '@use-it/event-listener';
// import { Container } from './styles';

const useCalc = () => {
    const [ valorTela, setValorTela ] = useState("");
    const [ resultado, setResultado ] = useState("");
    const [operacao, setOperacao] = useState(false);

    const limparTela = () => {
        setOperacao(false);
        setResultado("0");
        setValorTela("");
      }
    
      const adicionarDigitoNaTela = (digito: string) => {
        if((digito === "+" || digito === "-" || digito === "*" || digito === "/") && operacao ){
          setOperacao(false);
          setValorTela(resultado + digito);
          return
        }
    
        if(operacao){
          setOperacao(false);
          setValorTela(digito);
        }
    
        setValorTela(valorTela + digito);
      }
    
      const operar = (oper: string) => {
        if(oper === "bs"){
          let verTela = valorTela;
          verTela = verTela.substring(0, verTela.length - 1);
          setValorTela(verTela);
          setOperacao(false);
          return
        }
        try {
          const r = eval(valorTela);
          setResultado(r);
          setOperacao(true);
        } catch (error) {
          setResultado("ERROR")
        }
      }
    
      const calcKey = [
        {digito:"AC",fn: () =>  limparTela()},
        {digito:"(", fn: () => adicionarDigitoNaTela("(")},
        {digito:")", fn: () => adicionarDigitoNaTela(")")},
        {digito:"/", fn: () => adicionarDigitoNaTela("/")},
        {digito:"7", fn: () => adicionarDigitoNaTela("7")},
        {digito:"8", fn: () => adicionarDigitoNaTela("8")},
        {digito:"9", fn: () => adicionarDigitoNaTela("9")},
        {digito:"*", fn: () => adicionarDigitoNaTela("*")},
        {digito:"4", fn: () => adicionarDigitoNaTela("4")},
        {digito:"5", fn: () => adicionarDigitoNaTela("5")},
        {digito:"6", fn: () => adicionarDigitoNaTela("6")},
        {digito:"-", fn: () => adicionarDigitoNaTela("-")},
        {digito:"1", fn: () => adicionarDigitoNaTela("1")},
        {digito:"2", fn: () => adicionarDigitoNaTela("2")},
        {digito:"3", fn: () => adicionarDigitoNaTela("3")},
        {digito:"+", fn: () => adicionarDigitoNaTela("+")},
        {digito:"0", fn: () => adicionarDigitoNaTela("0")},
        {digito:".", fn: () => adicionarDigitoNaTela(".")},
        {digito:"Del", fn: () => operar("bs")},
        {digito:"=", fn: () => operar("=")},
      ];
      
      useEventListener('keydown', (e: KeyboardEvent) => {
        if(
          e.key === "+" ||  
          e.key === "-" ||
          e.key === "*" ||
          e.key === "/" ||
          e.key === "="
        ) {
            if(e.key === "="){
                operar("=");
                return
            }
          adicionarDigitoNaTela(e.key)
          return
        }
        
        if(e.code.startsWith("Digit")) {
            adicionarDigitoNaTela(e.key)
          return
        }
        if(
          e.code.startsWith("Shift") ||
          e.code.startsWith("Control") ||
          e.code.startsWith("Alt") ||
          e.code.startsWith("Meta")
        ) {
          return
        }
        alert("não é valido")
      })
    return {calcKey, valorTela, resultado};
}

export default useCalc;