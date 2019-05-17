class Validates {
    static isEmpty(str) {
        return (!str || 0 === str.length || /^\s*$/.test(str));
    }
    
    static validateEmail(email) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(email)) return true;
        return false;
    }
    
    static validatePassword(password) {
        if (password.length >= 6) return true;
        return false;
    }
    
    static confirmPassword(c_password, password) {
        if (c_password === password) return true;
        return false;
    }
    
    static validate(form) {
        let error = {};
        let success = true;        
        var keys = Object.keys(form);
        var length = keys.length;            
        keys.slice(0, length).map(field => {            
            if (field !== "error"){                
                var { type, value } = form[field];                
                if (Validates.isEmpty(value)){
                    error[field] = 'Your ' + field + ' is required';
                    success = false;
                }else{
                    error[field] = '';
                    if (type === "email" && !Validates.validateEmail(value)) {
                        error[field] = 'Enter a valid email address';
                        success = false;
                    }else if (type === "password" && !Validates.validatePassword(value)) {
                        error[field] = 'Password must be at least 6 characters';
                        success = false;
                    }
                }
            }
        });    
        return { success, error };
    }
}

export default Validates;




