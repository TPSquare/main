#include <bits/stdc++.h>
using namespace std;

#define _begin(file) ios::sync_with_stdio(false); cin.tie(nullptr); freopen((string(file) + ".inp").c_str(), "r", stdin); freopen((string(file) + ".out").c_str(), "w", stdout);
#define _end return 0;
#define FOR(i, a, b) for (i = a; i < b; i++)
#define ROF(i, a, b) for (i = a; i > b; i--)
#define all(var) var.begin(), var.end()
#define B begin()
#define E end()
#define S size()

const int maxN = 100005;
int n, m, i, j, l, a[maxN], x, res;
long long t;
bool dd[maxN];
vector<int> c[2];

int main() {
    _begin("xepbi");
    cin >> n >> m;
    FOR(i, 0, n) cin >> a[i];
    FOR(i, 0, n) {
        cin >> x;
        c[x].push_back(a[i]);
    }
    sort(all(c[0]));
    sort(all(c[1]));
    FOR(i, 0, 2) {
        memset(dd, false, c[i].S);
        ROF(j, c[i].S - 1, -1)
            if (!dd[j]) {
                ++res;
                t = c[i][j];
                l = j;
                while (t <= m) {
                    dd[l] = true;
                    l = lower_bound(all(c[i]), m - t) - c[i].B;
                    if (c[i][l] > m - t) --l;
                    while (dd[l] && l > 0) --l;
                    if (l == 0 && dd[l] == true) break;
                    t += c[i][l];
                }
            }
    }
    cout << res;
    _end;
}
