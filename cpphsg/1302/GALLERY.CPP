#include <bits/stdc++.h>
using namespace std;
#define _begin(f) ios::sync_with_stdio(false); cin.tie(nullptr); freopen((string(f) + ".out").c_str(), "w", stdout); freopen((string(f) + ".inp").c_str(), "r", stdin)
#define _end(v) return v
#define _n "\n"
#define FOR(i, a, b) for (i = a; i < b; i++)
#define FORs(i, a, b) for (i = a; i <= b; i++)
#define all(a) a.begin(), a.end()
int n, m, i, x, y, z;
vector<tuple<int, int, int>> a, b;
bool cp(int val, auto& a);
void f(int i) {
    x = get<1>(a[i]);
    //auto it = upper_bound
}
int main() {
    _begin("GALLERY");
    cin >> n >> m;
    FOR(i, 0, m) {
        cin >> x >> y >> z;
        a.push_back({x, y, z});
    }
    b = a;
    sort(all(a));
    sort(all(b), [](auto& a, auto& b) { return get<1>(a) < get<1>(b); });
    for (auto x : b) cout << get<0>(b) << " " << get<1>(b) << " " << get<2>(b) << "\n";
    FOR(i, 0, m)
        if (get<0>(a[i]) == 0) f(i);
        else break;
    _end(0);
}
