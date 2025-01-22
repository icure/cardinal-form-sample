"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cluster = void 0;
const ckmeans_1 = __importDefault(require("./ckmeans"));
const cluster = (data, maxDistanceInCluster, minDistanceBetweenClusters, slots) => {
    if (!data.length) {
        return { centroids: [], clusters: [] };
    }
    let k = slots !== null && slots !== void 0 ? slots : Math.max(Math.round(data.length / 5), 1); //Initialise k to a number of clusters equals to 1/5 of the number of data points
    const history = [];
    let isNotStable = true;
    let centroids = [];
    let clusters = [];
    while (isNotStable) {
        history.push(k);
        isNotStable = false;
        clusters = (0, ckmeans_1.default)(data, k);
        if (clusters.find((c) => !c.length)) {
            isNotStable = true;
            k--;
            continue;
        }
        centroids = clusters.map((a) => a.reduce((v, s) => s + v, 0) / a.length);
        const positions = centroids.sort((a, b) => a - b);
        for (let i = 0; i < positions.length - 1; i++) {
            const dist = Math.abs(positions[i] - positions[i + 1]);
            if (dist < minDistanceBetweenClusters) {
                if (!history.includes(k - 1)) {
                    isNotStable = true;
                    k--;
                }
                break;
            }
        }
        if (isNotStable) {
            continue;
        }
        for (let i = 0; i < clusters.length; i++) {
            const maxDistance = clusters[i].reduce((s, v) => Math.max(s, Math.abs(v - centroids[i])), 0);
            if (maxDistance > maxDistanceInCluster) {
                isNotStable = true;
                k++;
                break;
            }
        }
    }
    return { centroids: centroids, clusters: clusters };
};
exports.cluster = cluster;
//# sourceMappingURL=ckmeans-grouping.js.map