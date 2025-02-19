#include <bits/stdc++.h>
using namespace std;

int n, x, t;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("bai5.inp", "r", stdin);
    freopen("bai5.out", "w", stdout);
    cin >> n;
    while (n--) {
        cin >> x;
        t += x;
        cout << t << " ";
    }
    return 0;
}
