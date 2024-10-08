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
var _this = this;
function fetchPortfolioItems() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('../data/portfolioItems.json')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Could not fetch portfolio items.');
                    }
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
function createPortfolioItem(item) {
    var container = document.createElement('div');
    container.className = 'flex-item';
    var img = document.createElement('img');
    img.src = item.imageUrl && item.imageUrl.trim() !== "" ? item.imageUrl : '../img/placeholder-image.jpg';
    img.alt = item.title;
    var title = document.createElement('h3');
    title.textContent = item.title;
    var description = document.createElement('div');
    description.className = 'description';
    description.textContent = item.description;
    container.appendChild(title);
    container.appendChild(img);
    container.appendChild(description);
    return container;
}
function loadPortfolio() {
    return __awaiter(this, void 0, void 0, function () {
        var portfolioItems, container_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchPortfolioItems()];
                case 1:
                    portfolioItems = _a.sent();
                    container_1 = document.getElementById('portfolio-container');
                    if (container_1) {
                        portfolioItems.forEach(function (item) {
                            var portfolioItem = createPortfolioItem(item);
                            container_1.appendChild(portfolioItem);
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to load portfolio items:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var newProjectButton = document.getElementById('new-project');
if (newProjectButton) {
    newProjectButton.addEventListener('click', function () {
        window.location.href = './new-project';
    });
}
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    if (!form)
        return;
    form.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var titleInput, descriptionInput, newProject, response, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    titleInput = document.getElementById('title');
                    descriptionInput = document.getElementById('description');
                    if (!titleInput || !descriptionInput)
                        return [2 /*return*/];
                    newProject = {
                        title: titleInput.value,
                        imageUrl: "",
                        description: descriptionInput.value,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/submit-project', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newProject),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Error creating new project');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    console.log('Success:', result);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error('There was a problem with the fetch operation:', error_2);
                    return [3 /*break*/, 5];
                case 5:
                    window.location.href = '/';
                    return [2 /*return*/];
            }
        });
    }); });
});
document.addEventListener("DOMContentLoaded", function () {
    loadPortfolio();
});
