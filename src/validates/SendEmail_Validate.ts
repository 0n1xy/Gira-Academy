import { ISendEmail , ISendMultipleEmail} from "@/types/SendMail_Interface";
export function SendOneEmailValidate(options: ISendEmail){
    if(typeof(options.to) !== "string"){
        return{message: "input 'to' string type",success: false}
    }
    if(typeof(options.subject) !== "string"){
        return{message: "input 'subject' string type",success: false}
    }
    if(typeof(options.text) !== "string"){ 
        return{message: "input 'text' string type", success: false}
    }

    if(!options.to){
        return{message: "please enter 'to'",success: false}
    }
    if(!options.subject){
        return{message: "please enter 'subject'",success: false}
    }
    if(!options.text){ 
        return{message: "please enter 'text'", success: false}
    }
    return {success: true}
}

export function SendMultipleEmailValidate(options: ISendMultipleEmail){
    
    if(Array.isArray(options.to)){
        return{message: "input 'to' string type",success: false}
    }
    if(typeof(options.subject) !== "string"){
        return{message: "input 'subject' string type",success: false}
    }
    if(typeof(options.text) !== "string"){ 
        return{message: "input 'text' string type", success: false}
    }
    
    if(!options.to){
        return{message: "please enter 'to'",success: false}
    }
    if(!options.subject){
        return{message: "please enter 'subject'",success: false}
    }
    if(!options.text){ 
        return{message: "please enter 'text'", success: false}
    }
    return {success: true}
}