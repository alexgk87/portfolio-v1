"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_server_1 = require("@hono/node-server");
var hono_1 = require("hono");
var cors_1 = require("hono/cors");
var serve_static_1 = require("@hono/node-server/serve-static");
var fs_1 = require("fs");
var path_1 = require("path");
var app = new hono_1.Hono();
app.use("/*", (0, cors_1.cors)());
app.use("/static/*", (0, serve_static_1.serveStatic)({ root: "./" }));
app.use("/img/*", (0, serve_static_1.serveStatic)({ root: "./" }));
app.use("/data/*", (0, serve_static_1.serveStatic)({ root: "./" }));
// Root URL GET
app.get("/", function (index) {
    var html = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "index.html"), "utf-8");
    return index.html(html);
});
// New project subpage GET
app.get("/new-project", function (newProject) {
    var html = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "new-project.html"), "utf-8");
    return newProject.html(html);
});
// New project subpage POST
app.post('/submit-project', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var newProject, projectPath, projectData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, c.req.json()];
            case 1:
                newProject = _a.sent();
                projectPath = (0, path_1.join)(__dirname, './data/portfolioItems.json');
                projectData = JSON.parse((0, fs_1.readFileSync)(projectPath, 'utf-8'));
                projectData.push(newProject);
                (0, fs_1.writeFileSync)(projectPath, JSON.stringify(projectData, null, 2), 'utf-8');
                return [2 /*return*/, c.json({ message: 'Project added successfully' }, 200)];
            case 2:
                error_1 = _a.sent();
                console.error('Error updating portfolioItems.json:', error_1);
                return [2 /*return*/, c.json({ message: 'Failed to add project' }, 500)];
            case 3: return [2 /*return*/];
        }
    });
}); });
var port = 3999;
console.log("Server is running on http://localhost:" + port);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: port,
});
