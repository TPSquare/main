#include <bits/stdc++.h>
using namespace std;

vector<string> a;
string s;
int n, m, r;
bool c[999][255];
queue<pair<int, int>> q;
short d[4][2] = { {-1, 0}, {0, 1}, {1, 0}, {0, -1} };

void bfs(int x, int y) {
    queue<pair<int, int>> q;
    q.push({x, y});
    c[x][y] = 1;
    while (!q.empty()) {
        auto it = q.front();
        q.pop();
        for (auto p : d) {
            int i = it.first + p[0],
                j = it.second + p[1];
            if (i < 0 || i >= m || j < 0 || j >= n) continue;
            if (!c[i][j] && a[i][j] == 'x') {
                q.push({i, j});
                c[i][j] = 1;
            }
        }
    }
    ++r;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("bai2.inp", "r", stdin);
    freopen("bai2.out", "w", stdout);
    while (cin >> s) a.push_back(s);
    n = a[0].size();
    m = a.size();
    for (int i = 0, j; i < m; i++)
        for (j = 0; j < n; j++)
            if (!c[i][j] && a[i][j] == 'x') bfs(i, j);
    cout << r;
    return 0;
}
