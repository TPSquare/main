#include <bits/stdc++.h>
using namespace std;
#define START(file) ios::sync_with_stdio(false); cin.tie(nullptr); freopen((string(file) + ".inp").c_str(), "r", stdin); freopen((string(file) + ".out").c_str(), "w", stdout)
#define FOR(i, a, b) for (i = a; i < b; i++)
#define FORs(i, a, b) for (i = a; i <= b; i++)
#define ROFs(i, a, b) for (i = a; i >= b; i--)
#define ll long long
#define db double
#define INF 1e18
ll l, r, t, d, m, r1, r2, r3, rmin, i;
ll sum(ll x, ll y) {
    return (y - x + 1) * (x + y) / 2;
}
int main() {
    START("timg");
    cin >> l >> r;
    t = sum(l, r);
    d = 1 + 4*(r*r + r - t);
    m = max(db((-1.0 + sqrt(d)) / 2), db((-1.0 - sqrt(d)) / 2));
    r1 = abs(sum(l, m) - sum(m + 1, r));
    r2 = (m - 1 < l ? INF : abs(sum(l, m - 1) - sum(m, r)));
    r3 = (m + 1 > r ? INF : abs(sum(l, m + 1) - sum(m + 2, r)));
    rmin = min(r1, min(r2, r3));
    if (rmin == r2) cout << m - 1;
    else cout << (rmin == r1 ? m : m + 1);
    return 0;
}
