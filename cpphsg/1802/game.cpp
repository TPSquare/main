#include <bits/stdc++.h>
using namespace std;
#define START(file) ios::sync_with_stdio(false); cin.tie(nullptr); freopen(file".inp", "r", stdin); freopen(file".out", "w", stdout)
#define FOR(i, a, b) for (i = a; i < b; i++)
#define ll long long

ll a, b, i, r;
signed main() {
    START("game");
    cin >> a >> b;
    FOR(i, 0, 2) r += a > b ? a-- : b--;
    cout << r;
}
