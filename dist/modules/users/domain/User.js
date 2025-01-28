"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// faire un contract avec l'interface de l'utilisateur (User)
const typeorm_1 = require("typeorm");
let User = exports.User = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _firstname_decorators;
    let _firstname_initializers = [];
    let _lastname_decorators;
    let _lastname_initializers = [];
    let _pseudo_decorators;
    let _pseudo_initializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _password_decorators;
    let _password_initializers = [];
    let _telnumber_decorators;
    let _telnumber_initializers = [];
    let _salt_decorators;
    let _salt_initializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _data_decorators;
    let _data_initializers = [];
    var User = _classThis = class {
        /*
        ----------------------------------------------------------------------------------
            Add liaisons here with other Entities
            Ex :
                - @OneToMany
                    entityName: EntityName
                - @OneToMany
                    entityName: EntityName
                - @ManyToMany
                    entityName: EntityName
                - @ManyToMany
                    entityName: EntityName
        ----------------------------------------------------------------------------------
        */
        constructor(id, email, password, salt, firstname, lastname, pseudo, telnumber) {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.firstname = __runInitializers(this, _firstname_initializers, void 0);
            this.lastname = __runInitializers(this, _lastname_initializers, void 0);
            this.pseudo = __runInitializers(this, _pseudo_initializers, void 0);
            this.email = __runInitializers(this, _email_initializers, void 0);
            this.password = __runInitializers(this, _password_initializers, void 0);
            this.telnumber = __runInitializers(this, _telnumber_initializers, void 0);
            this.salt = __runInitializers(this, _salt_initializers, void 0);
            this.createdAt = __runInitializers(this, _createdAt_initializers, void 0);
            this.updatedAt = __runInitializers(this, _updatedAt_initializers, void 0);
            this.data = __runInitializers(this, _data_initializers, void 0);
            this.id = id;
            this.firstname = firstname;
            this.lastname = lastname;
            this.pseudo = pseudo;
            this.email = email;
            this.password = password;
            this.telnumber = telnumber;
            this.salt = salt;
        }
        getId() {
            return this.id;
        }
        setId(id) {
            this.id = id;
        }
        getFirstname() {
            return this.firstname;
        }
        setFirstname(firstname) {
            this.firstname = firstname;
        }
        getLastname() {
            return this.lastname;
        }
        setLastname(lastname) {
            this.lastname = lastname;
        }
        getPseudo() {
            return this.pseudo;
        }
        setPseudo(pseudo) {
            this.pseudo = pseudo;
        }
        getEmail() {
            return this.email;
        }
        setEmail(email) {
            this.email = email;
        }
        getPassword() {
            return this.password;
        }
        setPassword(password) {
            this.password = password;
        }
        getTelnumber() {
            return this.telnumber;
        }
        setTelnumber(telnumber) {
            this.telnumber = telnumber;
        }
        getSalt() {
            return this.salt;
        }
        setSalt(salt) {
            this.salt = salt;
        }
        getCreatedAt() {
            return this.createdAt;
        }
        setCreatedAt(date) {
            this.createdAt = date;
        }
        getUpdatedAt() {
            return this.updatedAt;
        }
        setUpdatedAt(date) {
            this.updatedAt = date;
        }
    };
    __setFunctionName(_classThis, "User");
    (() => {
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _firstname_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _lastname_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _pseudo_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _email_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _password_decorators = [(0, typeorm_1.Column)()];
        _telnumber_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _salt_decorators = [(0, typeorm_1.Column)()];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _data_decorators = [(0, typeorm_1.Column)('json', { nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } } }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _firstname_decorators, { kind: "field", name: "firstname", static: false, private: false, access: { has: obj => "firstname" in obj, get: obj => obj.firstname, set: (obj, value) => { obj.firstname = value; } } }, _firstname_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _lastname_decorators, { kind: "field", name: "lastname", static: false, private: false, access: { has: obj => "lastname" in obj, get: obj => obj.lastname, set: (obj, value) => { obj.lastname = value; } } }, _lastname_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _pseudo_decorators, { kind: "field", name: "pseudo", static: false, private: false, access: { has: obj => "pseudo" in obj, get: obj => obj.pseudo, set: (obj, value) => { obj.pseudo = value; } } }, _pseudo_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } } }, _email_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: obj => "password" in obj, get: obj => obj.password, set: (obj, value) => { obj.password = value; } } }, _password_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _telnumber_decorators, { kind: "field", name: "telnumber", static: false, private: false, access: { has: obj => "telnumber" in obj, get: obj => obj.telnumber, set: (obj, value) => { obj.telnumber = value; } } }, _telnumber_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _salt_decorators, { kind: "field", name: "salt", static: false, private: false, access: { has: obj => "salt" in obj, get: obj => obj.salt, set: (obj, value) => { obj.salt = value; } } }, _salt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } } }, _createdAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } } }, _updatedAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } } }, _data_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
})();
