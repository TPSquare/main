#include <bits/stdc++.h>
using namespace std;
#define START(file) ios::sync_with_stdio(false); cin.tie(nullptr); freopen(file".inp", "r", stdin); freopen(file".out", "w", stdout)
#define FOR(i, a, b) for (i = a; i < b; i++)
#define ll long long

int x[4], y[4], sx, sy, ex, ey, i, r;
signed main() {
    START("DiemNamTrong");
    FOR(i, 0, 4) cin >> x[i] >> y[i];
    if (x[0] < x[1]) {
        sx = x[0];
        ex = x[1];
    } else {
        sx = x[1];
        ex = x[0];
    }
    if (y[0] < y[1]) {
        sy = y[0];
        ey = y[1];
    } else {
        sy = y[1];
        ey = y[0];
    }
    FOR(i, 2, 4)
        if (x[i] > sx && x[i] < ex && y[i] > sy && y[i] < ey) ++r;
    cout << r;
}
