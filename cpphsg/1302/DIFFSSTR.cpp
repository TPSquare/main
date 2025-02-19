#include <bits/stdc++.h>
using namespace std;
#define _begin(f) ios::sync_with_stdio(false); cin.tie(nullptr); freopen((string(f) + ".out").c_str(), "w", stdout); freopen((string(f) + ".inp").c_str(), "r", stdin)
#define _end(v) return v
#define _n "\n"
#define FOR(i, a, b) for (i = a; i < b; i++)
#define FORs(i, a, b) for (i = a; i <= b; i++)
int n, l, i;
string s;
unordered_map<string, bool> a;
int main() {
    _begin("DIFFSSTR");
    cin >> n >> s;
    FOR(l, 1, n) {
        a.clear();
        FORs(i, 0, n - l)
            if (a[s.substr(i, l)]++) break;
        if (i <= n - l) continue;
        cout << l;
        _end(0);
    }
    _end(0);
}
