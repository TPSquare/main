#include <bits/stdc++.h>
using namespace std;
#define START(file) ios::sync_with_stdio(false); cin.tie(nullptr); freopen(file".inp", "r", stdin); freopen(file".out", "w", stdout)
#define FOR(i, a, b) for (i = a; i < b; i++)
#define ll long long
#define um unordered_map

#define a x[0]
#define b x[1]
#define c x[2]
int q, x[3];
signed main() {
    START("conrua");
    cin >> q;
    while (q--) {
        cin >> a >> b >> c;
        sort(x, x + 3);
        if (a < b) ++a;
        if (c > b) --c;
        cout << (abs(a - b) + abs(a - c) + abs(b - c)) << "\n";
    };
}


