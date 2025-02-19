#include <bits/stdc++.h>
using namespace std;

int t, m, i, u, x;
vector<int> p;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("nto.inp", "r", stdin);
    freopen("nto.out", "w", stdout);
    cin >> t;
    while (t--) {
        cin >> m;
        x = m;
        p.clear();
        u = 2;
        if (m % 2 == 0)
            if (m / 2 != 2) u += 2;
            else u++;
        while (m % 2 == 0) {
            p.push_back(2);
            m /= 2;
        }
        for (i = 3; i * i <= m; i += 2) {
            if (m % i == 0)
                if (i != m / i) u += 2;
                else u++;
            while (m % i == 0) {
                p.push_back(i);
                m /= i;
            }
        }
        if (m > 1) {
            p.push_back(m);
            if (find(p.begin(), p.end(), x / m) == p.end()) u += 2;
        }
        m = p.size();
        if (m == 1) {
            cout << "2 " << x << "\n";
            continue;
        }
        cout << u << " ";
        for (i = 0; i < m - 1; i++)
            cout << p[i] << "*";
        cout << p[m-1] << "\n";
    }
    return 0;
}
