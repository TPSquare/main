#include <bits/stdc++.h>
using namespace std;
#define _begin(f) ios::sync_with_stdio(false); cin.tie(nullptr); freopen((string(f) + ".out").c_str(), "w", stdout); freopen((string(f) + ".inp").c_str(), "r", stdin);
#define _end return 0;
#define _n "\n"
#define FOR(i, a, b) for (i = a; i < b; i++)
int n, i, x;
unordered_map<int, int> dd, da;
vector<int> l, r;
int main() {
    _begin("SDB");
    cin >> n;
    FOR(i, 0, n) {
        cin >> x;
        if ((x >= 0 && ++dd[x] == 1) || (x < 0 && ++da[x] == 1)) l.push_back(x);
    }
    for (int x : l)
        if ((x >= 0 && dd[x] == 1) || (x < 0 && da[x] == 1)) r.push_back(x);
    cout << r.size() << _n;
    for (int x : r) cout << x << _n;
    _end;
}
