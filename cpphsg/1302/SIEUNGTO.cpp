#include <bits/stdc++.h>
using namespace std;
#define _begin(f) ios::sync_with_stdio(false); cin.tie(nullptr); freopen((string(f) + ".out").c_str(), "w", stdout); freopen((string(f) + ".inp").c_str(), "r", stdin)
#define _end(v) return v
#define _n "\n"
#define FOR(i, a, b) for (i = a; i < b; i++)
#define FORs(i, a, b) for (i = a; i <= b; i++)
int n, m, i, s, x, y;
bool not_nt[10000006];
bool is_nt(int x) {
    if (x < 2) _end(0);
    if (x == 2) _end(1);
    if (x % 2 == 0) _end(0);
    for (i = 3; i * i <= x; i += 2)
        if (x % i == 0) _end(0);
    _end(1);
}
void snt(int x) {
    if (x == 0) _end();
    y = x;
    while (y)
        if (not_nt[y]) _end();
        else y /= 10;
    cout << x << _n;
}
int main() {
    _begin("SIEUNGTO");
    cin >> n;
    if (n > 1) s = pow(10, n) / 10 * 2;
    FOR(i, 0, n) m = m * 10 + 9;
    not_nt[0] = 1;
    not_nt[1] = 1;
    FORs(x, 2, m)
        if (!not_nt[x] && is_nt(x))
            for (i = x + x; i <= m; i += x)
                not_nt[i] = 1;
    FORs(x, s, m) snt(x);
    _end(0);
}
