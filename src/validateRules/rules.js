export function emailValidation(value){
    if (!value) {
        return 'Введите поле email';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Введите email корректно';
    }
    return true
}
export function passwordValidation(value){
    if (!value) {
        return 'Введите пароль';
    }
    if (value.length < 6) {
        return 'Длина пароля должна составлять минимум 6 символов';
    }
    return true;
}

export function nameValidation(value){
    if (!value) {
        return 'Введите имя';
    }
    if(!/^[a-zа-я]{3,}$/i.test(value)){
        return 'Введите корректное имя';
    }
    return true;
}

export function checkBoxValidation(value){
    return value === 'on' ? true : 'Необходимо согласиться с правилами';
}

export function minValueValidation(value, minVal = 10000){
    return value > minVal ? true : false;
}

export function requiredRule(value){
    return value ? true : 'Данное поле обязательное';
}

export function StringValue(value){
    if(!/^[a-z]+$/i.test(value)){
        return 'Данное поле должно являться строкой';
    }
    return true;
}

export function NumberValue(value){
    return /^[\d]+$/i.test(value)  
}