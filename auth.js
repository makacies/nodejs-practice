class Auth {
    constructor(permissionsConfig) {
        const permissions = JSON.parse(permissionsConfig);
        this.permissions = permissions.map(permission => {
            const keys = Object.keys(permission);
            return ({
                rule: keys[0].replace('AUTH_', '').replace('_FIELD', '').replace('_MATCH', ''),
                field: permission[keys.find(k => k.includes("FIELD"))],
                match: permission[keys.find(k => k.includes("MATCH"))]
            })
        });
    }

    hasAccess(rule, user) {
        const accessCondition = this.permissions.find(item => item.rule === rule);
        const regExp = new RegExp(accessCondition.match, "g");
        return regExp.test(user[accessCondition.field])
    };
}

module.exports = {
    Auth
};