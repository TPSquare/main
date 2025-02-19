#include <bits/stdc++.h>
using namespace std;

vector<int> a;
int q, n, i, x, r, cur;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("chiahetcho5.inp", "r", stdin);
    freopen("chiahetcho5.out", "w", stdout);
    cin >> q;
    while (q--) {
        cin >> n;
        r = 0;
        for (i = 0; i < n; i++) {
            cin >> x;
            if (x % 5 == 0) r++;
            else a.push_back(x);
        }
        sort(a.begin(), a.end());
        i = 1;
        for (cur = a.size() - 1; cur > 0; cur--)
            while (true) {
                x = 5 * i - a[cur];
                if (x > a[cur]) break;
                auto it = lower_bound(a.begin(), a.end(), x);
                if (*it == x) {
                    r++;
                    a.erase(it);
                } else i++;
            }
        cout << r << "\n";
    }
    return 0;
}
