class Auth {
    constructor(permissions) {
        this.permissions = permissions;
    }

    hasAccess(rule, user) {
        const accessCondition = this.permissions.find(item => item.rule === rule);
        const regExp = new RegExp(accessCondition.match, "g"); 
        const hasAccess = user[accessCondition.field].match(regExp);
        return (hasAccess && hasAccess.length === 1);
    };
}
    
module.exports = {
    Auth
};