#include <bits/stdc++.h>
using namespace std;
#define START(file) ios::sync_with_stdio(false); cin.tie(nullptr); freopen(file".inp", "r", stdin); freopen(file".out", "w", stdout)
#define FOR(i, a, b) for (i = a; i < b; i++)
#define ll long long
#define um unordered_map

const int maxN = 3000006;
int i, n, m, a[maxN], r, x;
um<int, bool>  ok;
um<int, ll> t;
signed main() {
    START("thuong");
    cin >> n >> m;
    FOR(i, 0, n) {
        cin >> a[i];
        ok[a[i]] = true;
        t[a[i]] += a[i];
    }
    FOR(i, 0, m) {
        cin >> x;
        ok[x] = false;
    }
    FOR(i, 0, n)
        if (ok[a[i]]) {
            cout << a[i] << " ";
            if (t[a[i]] > r) r = t[a[i]];
        }
    cout << "\n" << r;
}

