#include <bits/stdc++.h>
using namespace std;
#define START(file) ios::sync_with_stdio(false); cin.tie(nullptr); freopen(file".inp", "r", stdin); freopen(file".out", "w", stdout)
#define FOR(i, a, b) for (i = a; i < b; i++)
#define FORs(i, a, b) for (i = a; i <= b; i++)
#define ROFs(i, a, b) for (i = a; i >= b; i--)
#define ll long long
#define db double
#define INF 1e18
ll n, k, i, e, j, x, p[100006];
db m;
int main() {
    START("average");
    cin >> n >> k;
    FORs(i, 1, n) {
        cin >> x;
        p[i] = x + p[i - 1];
    }
    e = n - k;
    FORs(i, 0, e)
        FOR(j, i + k - 1, n)
            m = max(m, (db)(p[j] - p[i - 1]) / (j - i + 1));
    cout << fixed << setprecision(3) << m;
    return 0;
}
